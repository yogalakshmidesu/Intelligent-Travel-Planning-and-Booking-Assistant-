import React, { useState } from 'react';
import { 
  Calendar, MapPin, DollarSign, Bookmark, Share2, Printer, CheckCircle2, 
  Sparkles, Hotel, Plane, CloudSun, Utensils, Landmark, Camera, Trees, 
  Flame, ShoppingBag, Footprints, Ship, Castle, ArrowLeft, Check, CreditCard 
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export default function ItineraryView({ plan, currency, onSave, isSaved, onBookPackage, onBack }) {
  const [activeTab, setActiveTab] = useState('timeline');
  const [checkedActivities, setCheckedActivities] = useState({});
  const [checkedPacking, setCheckedPacking] = useState({});

  if (!plan) return null;

  const dest = plan.destination || {};
  const cost = plan.costSummary || {};
  const weather = plan.weatherForecast || {};

  const toggleActivity = (id) => {
    setCheckedActivities(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePackingItem = (item) => {
    setCheckedPacking(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `TripMind Plan to ${dest.name}`,
        text: `Check out my ${plan.durationDays}-day AI itinerary for ${dest.name}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Trip link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-8 space-y-8 animate-fadeIn px-4">
      
      {/* Top Navigation & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-[#0B3C49] bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Modify Trip Parameters</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onSave(plan)}
            className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
              isSaved
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-[#0B3C49] hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved to My Trips' : 'Save Itinerary'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-xs font-bold bg-white border border-slate-200 text-[#0B3C49] px-4 py-2.5 rounded-xl hover:bg-slate-50"
          >
            <Share2 className="w-4 h-4 text-[#117A8B]" />
            <span>Share</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 text-xs font-bold bg-white border border-slate-200 text-[#0B3C49] px-4 py-2.5 rounded-xl hover:bg-slate-50"
          >
            <Printer className="w-4 h-4 text-[#117A8B]" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Hero Destination Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl h-80 sm:h-96 group">
        <img
          src={dest.bannerImage || dest.image}
          alt={dest.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

        {/* Floating Badges */}
        <div className="absolute top-6 left-6 flex flex-wrap gap-2">
          <span className="bg-[#FF6B4A] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {plan.durationDays} Days • {plan.vibe} Vibe
          </span>
          <span className="bg-white/90 backdrop-blur-md text-[#0B3C49] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
            ⭐ {dest.rating || 4.9} Rating
          </span>
          <span className="bg-[#0B3C49]/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
            {plan.travelersCount} {plan.travelersCount === 1 ? 'Traveler' : 'Travelers'}
          </span>
        </div>

        {/* Banner Details */}
        <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <MapPin className="w-4 h-4 text-[#FF6B4A]" />
              <span>{dest.country} • {dest.region}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-1 tracking-tight">
              {dest.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-xl line-clamp-2 font-normal">
              {dest.tagline}
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl text-[#0B3C49] shrink-0 text-right shadow-lg">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Estimated Total Trip Cost</div>
            <div className="font-serif font-bold text-2xl text-[#FF6B4A]">
              {formatCurrency(cost.grandTotal, currency)}
            </div>
            <div className="text-[11px] font-semibold text-slate-600">
              ~{formatCurrency(cost.totalEstimatePerPerson, currency)} / person
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs Header */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap gap-1">
        {[
          { id: 'timeline', label: '📅 Daily Schedule' },
          { id: 'budget', label: '💰 Budget Breakdown' },
          { id: 'booking', label: '✈️ Flights & Hotels' },
          { id: 'packing', label: '🧳 Packing List' },
          { id: 'weather', label: '☀️ Weather & Tips' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-[#0B3C49] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: DAILY SCHEDULE TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          {plan.days?.map((day) => (
            <div key={day.dayNumber} className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#0B3C49] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#117A8B]/10 text-[#117A8B] flex items-center justify-center text-xs font-extrabold">
                    D{day.dayNumber}
                  </span>
                  {day.title}
                </h3>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  Est. Day Cost: {formatCurrency(day.estimatedCostPerPerson, currency)} / person
                </span>
              </div>

              {/* Schedule Timeline Cards */}
              <div className="space-y-3">
                {day.schedule?.map((act) => {
                  const isChecked = checkedActivities[act.id];
                  return (
                    <div
                      key={act.id}
                      onClick={() => toggleActivity(act.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                        isChecked
                          ? 'bg-slate-50 border-slate-200 opacity-60 line-through'
                          : 'bg-white border-slate-200 hover:border-[#117A8B] hover:shadow-xs'
                      }`}
                    >
                      <button
                        type="button"
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-4 h-4" />}
                      </button>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#FF6B4A]">{act.time}</span>
                          {act.cost > 0 && (
                            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                              {formatCurrency(act.cost, currency)}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-[#0B3C49]">{act.title}</h4>
                        <p className="text-xs text-slate-500 font-medium">{act.note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      )}

      {/* TAB 2: BUDGET BREAKDOWN */}
      {activeTab === 'budget' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#0B3C49]">Detailed Budget Breakdown</h3>
            <p className="text-xs text-slate-500">Cost estimate split by category for {plan.travelersCount} travelers over {plan.durationDays} days</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              
              {/* Flights */}
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-200">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-slate-700">
                    <Plane className="w-4 h-4 text-[#117A8B]" /> Flights (Roundtrip)
                  </span>
                  <span className="text-[#0B3C49]">{formatCurrency(cost.flightEstimatePerPerson * plan.travelersCount, currency)}</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#117A8B] h-full" style={{ width: '35%' }}></div>
                </div>
              </div>

              {/* Hotel */}
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-200">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-slate-700">
                    <Hotel className="w-4 h-4 text-[#FF6B4A]" /> Accommodations ({plan.durationDays - 1} nights)
                  </span>
                  <span className="text-[#0B3C49]">{formatCurrency(cost.hotelEstimatePerNight * (plan.durationDays - 1), currency)}</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#FF6B4A] h-full" style={{ width: '40%' }}></div>
                </div>
              </div>

              {/* Food & Dining */}
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-200">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-slate-700">
                    <Utensils className="w-4 h-4 text-amber-500" /> Food & Dining
                  </span>
                  <span className="text-[#0B3C49]">{formatCurrency(cost.foodTotalPerPerson * plan.travelersCount, currency)}</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full" style={{ width: '15%' }}></div>
                </div>
              </div>

              {/* Activities */}
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-200">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-slate-700">
                    <Landmark className="w-4 h-4 text-emerald-600" /> Activities & Tickets
                  </span>
                  <span className="text-[#0B3C49]">{formatCurrency(cost.activitiesTotalPerPerson * plan.travelersCount, currency)}</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full" style={{ width: '10%' }}></div>
                </div>
              </div>

            </div>

            {/* Total Card */}
            <div className="bg-gradient-to-br from-[#0B3C49] to-[#117A8B] text-white p-6 rounded-3xl flex flex-col justify-between space-y-6 shadow-lg">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B4A]">Total Summary</span>
                <h4 className="font-serif text-3xl font-bold mt-2">{formatCurrency(cost.grandTotal, currency)}</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Estimated overall budget for {plan.travelersCount} travelers ({plan.budgetTier} Tier)
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Per Person Total:</span>
                  <span className="font-bold text-[#FF6B4A]">{formatCurrency(cost.totalEstimatePerPerson, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Daily Spend:</span>
                  <span className="font-bold text-white">{formatCurrency(Math.round(cost.grandTotal / plan.durationDays), currency)}</span>
                </div>
              </div>

              <button
                onClick={onBookPackage}
                className="w-full bg-[#FF6B4A] hover:bg-[#E85A39] text-white font-bold text-xs py-3 rounded-xl shadow-md transition-colors"
              >
                Proceed to Reservation Simulation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FLIGHTS & HOTELS */}
      {activeTab === 'booking' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#0B3C49] flex items-center gap-2">
              <Plane className="w-5 h-5 text-[#117A8B]" /> Flight Comparisons
            </h3>

            <div className="space-y-3">
              {dest.sampleFlights?.map((flight) => (
                <div key={flight.id} className="p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50 hover:bg-white transition-colors">
                  <div>
                    <div className="text-xs font-bold text-[#0B3C49]">{flight.airline} • {flight.flightNumber}</div>
                    <div className="text-xs text-slate-500 font-medium">{flight.duration} • {flight.stops}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-serif font-bold text-base text-[#FF6B4A]">{formatCurrency(flight.price, currency)}</div>
                    <div className="text-[10px] text-slate-400">per passenger</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#0B3C49] flex items-center gap-2">
              <Hotel className="w-5 h-5 text-[#FF6B4A]" /> Recommended Stays
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dest.sampleHotels?.map((hotel) => (
                <div key={hotel.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 hover:shadow-md transition-shadow">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-36 object-cover" />
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-[#0B3C49] leading-tight">{hotel.name}</h4>
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                        ★ {hotel.rating}
                      </span>
                    </div>
                    <div className="font-serif font-bold text-sm text-[#FF6B4A]">
                      {formatCurrency(hotel.pricePerNight, currency)} <span className="text-[10px] text-slate-500 font-normal">/ night</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 text-center">
              <button
                onClick={onBookPackage}
                className="bg-[#0B3C49] hover:bg-[#09313C] text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow-md"
              >
                Reserve Flight + Hotel Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PACKING CHECKLIST */}
      {activeTab === 'packing' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#0B3C49]">Smart Destination Packing List</h3>
            <p className="text-xs text-slate-500">Customized checklist based on {dest.name}'s climate & planned activities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plan.packingChecklist?.map((group, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#117A8B]">{group.category}</h4>
                <div className="space-y-2">
                  {group.items?.map((item, i) => {
                    const isDone = checkedPacking[item];
                    return (
                      <div
                        key={i}
                        onClick={() => togglePackingItem(item)}
                        className={`flex items-center gap-2.5 text-xs p-2 rounded-xl cursor-pointer transition-colors ${
                          isDone ? 'bg-emerald-50 text-emerald-800 line-through' : 'hover:bg-white text-slate-700'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                        }`}>
                          {isDone && <Check className="w-3 h-3" />}
                        </div>
                        <span className="font-medium">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: WEATHER & TIPS */}
      {activeTab === 'weather' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#0B3C49]">Destination Intelligence & Tips</h3>
            <p className="text-xs text-slate-500">Weather, best travel seasons, and practical guidance for {dest.name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FF6B4A]">
                <CloudSun className="w-5 h-5" /> Weather Forecast Summary
              </div>
              <div className="text-2xl font-bold text-[#0B3C49] font-serif">{weather.avgTemp || '21°C'}</div>
              <p className="text-xs text-slate-600 font-medium">{weather.condition}</p>
              <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
                💡 <strong>Packing Tip:</strong> {weather.packingTip}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#117A8B]">
                <Sparkles className="w-5 h-5" /> Key Destination Facts
              </div>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500">Best Travel Months:</span>
                  <span className="font-bold">{dest.bestMonths}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500">Local Currency:</span>
                  <span className="font-bold">{dest.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Recommended Duration:</span>
                  <span className="font-bold">{dest.idealDays} Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
