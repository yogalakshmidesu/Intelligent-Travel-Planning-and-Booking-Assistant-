import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PlannerForm from './components/PlannerForm';
import GeneratingLoader from './components/GeneratingLoader';
import ItineraryView from './components/ItineraryView';
import ExploreDestinations from './components/ExploreDestinations';
import SavedTrips from './components/SavedTrips';
import TravelTools from './components/TravelTools';
import AIChatDrawer from './components/AIChatDrawer';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import { generateItineraryApi } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('planner');
  const [currency, setCurrency] = useState('USD');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [selectedDestinationId, setSelectedDestinationId] = useState('tokyo-japan');
  const [savedTrips, setSavedTrips] = useState([]);
  const [bookingModalPlan, setBookingModalPlan] = useState(null);

  // Load saved trips from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tripmind_saved_trips');
      if (stored) {
        setSavedTrips(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read saved trips from localStorage');
    }
  }, []);

  // Save trips to localStorage helper
  const persistSavedTrips = (newList) => {
    setSavedTrips(newList);
    try {
      localStorage.setItem('tripmind_saved_trips', JSON.stringify(newList));
    } catch (e) {
      console.warn('Could not persist to localStorage');
    }
  };

  const handleGenerateItinerary = async (formData) => {
    setIsGenerating(true);
    setGeneratedPlan(null);
    window.scrollTo({ top: 300, behavior: 'smooth' });

    // Call API (with 2.5s display delay for animation feel if response is instant)
    const startTime = Date.now();
    const plan = await generateItineraryApi(formData);
    const elapsedTime = Date.now() - startTime;
    const remainingDelay = Math.max(0, 2500 - elapsedTime);

    setTimeout(() => {
      setIsGenerating(false);
      if (plan) {
        setGeneratedPlan(plan);
        setActiveTab('planner');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, remainingDelay);
  };

  const handleQuickDestinationSelect = (destId) => {
    setSelectedDestinationId(destId);
    handleGenerateItinerary({
      destinationId: destId,
      days: 5,
      travelers: 2,
      budget: 'Mid-range',
      vibe: 'Foodie'
    });
  };

  const handleToggleSaveTrip = (planToSave) => {
    if (!planToSave) return;
    const exists = savedTrips.some(p => p.id === planToSave.id);
    let updated;
    if (exists) {
      updated = savedTrips.filter(p => p.id !== planToSave.id);
    } else {
      updated = [planToSave, ...savedTrips];
    }
    persistSavedTrips(updated);
  };

  const handleDeleteSavedTrip = (id) => {
    const updated = savedTrips.filter(p => p.id !== id);
    persistSavedTrips(updated);
  };

  const handleNewTripClick = () => {
    setGeneratedPlan(null);
    setActiveTab('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-[#FF6B4A] selection:text-white">
      
      {/* Navbar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currency={currency}
        setCurrency={setCurrency}
        savedTripsCount={savedTrips.length}
        onNewTripClick={handleNewTripClick}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* TAB 1: AI PLANNER */}
        {activeTab === 'planner' && (
          <div>
            {!generatedPlan && !isGenerating && (
              <>
                <Hero
                  onStartPlanning={() => {
                    const el = document.getElementById('planner-form-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onSelectQuickDestination={handleQuickDestinationSelect}
                />

                <div id="planner-form-section" className="px-4">
                  <PlannerForm
                    onSubmit={handleGenerateItinerary}
                    initialDestination={selectedDestinationId}
                    isLoading={isGenerating}
                  />
                </div>
              </>
            )}

            {isGenerating && <GeneratingLoader />}

            {generatedPlan && !isGenerating && (
              <ItineraryView
                plan={generatedPlan}
                currency={currency}
                onSave={handleToggleSaveTrip}
                isSaved={savedTrips.some(p => p.id === generatedPlan.id)}
                onBookPackage={() => setBookingModalPlan(generatedPlan)}
                onBack={() => setGeneratedPlan(null)}
              />
            )}
          </div>
        )}

        {/* TAB 2: EXPLORE DESTINATIONS */}
        {activeTab === 'explore' && (
          <ExploreDestinations
            currency={currency}
            onSelectDestination={(destId) => {
              setSelectedDestinationId(destId);
              setActiveTab('planner');
              setGeneratedPlan(null);
            }}
          />
        )}

        {/* TAB 3: SAVED TRIPS */}
        {activeTab === 'saved' && (
          <SavedTrips
            savedTrips={savedTrips}
            onLoadSavedTrip={(plan) => {
              setGeneratedPlan(plan);
              setActiveTab('planner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onDeleteSavedTrip={handleDeleteSavedTrip}
            onStartNewTrip={handleNewTripClick}
            currency={currency}
          />
        )}

        {/* TAB 4: TRAVEL TOOLS */}
        {activeTab === 'tools' && (
          <TravelTools />
        )}

      </main>

      {/* Floating AI Chat Assistant Widget */}
      <AIChatDrawer
        destinationName={generatedPlan?.destination?.name || 'your destination'}
      />

      {/* Booking Simulation Modal */}
      {bookingModalPlan && (
        <BookingModal
          plan={bookingModalPlan}
          currency={currency}
          onClose={() => setBookingModalPlan(null)}
        />
      )}

      {/* Footer */}
      <Footer
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartPlanning={handleNewTripClick}
      />

    </div>
  );
}
