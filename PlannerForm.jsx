import React, { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Compass, Sparkles, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';

const DESTINATION_OPTIONS = [
  { id: 'tokyo-japan', label: 'Tokyo, Japan', category: 'City' },
  { id: 'paris-france', label: 'Paris, France', category: 'City' },
  { id: 'bali-indonesia', label: 'Bali, Indonesia', category: 'Beach' },
  { id: 'santorini-greece', label: 'Santorini, Greece', category: 'Beach' },
  { id: 'reykjavik-iceland', label: 'Reykjavik, Iceland', category: 'Adventure' },
  { id: 'new-york-usa', label: 'New York City, USA', category: 'City' },
];

const VIBES = [
  { id: 'Cultural', label: 'Cultural & History', emoji: '🏛️' },
  { id: 'Foodie', label: 'Food & Culinary', emoji: '🍜' },
  { id: 'Romantic', label: 'Romantic Getaway', emoji: '🍷' },
  { id: 'Adventure', label: 'Nature & Adventure', emoji: '🏔️' },
  { id: 'Relaxation', label: 'Beach & Spa', emoji: '🏝️' },
  { id: 'Shopping', label: 'Shopping & Fashion', emoji: '🛍️' },
  { id: 'Nightlife', label: 'Nightlife & Drinks', emoji: '🍸' },
];

const BUDGET_TIERS = [
  { id: 'Backpacker', label: 'Budget', desc: 'Hostels, public transit & street food', symbol: '$' },
  { id: 'Mid-range', label: 'Standard', desc: '4-star hotels, bistro dining & popular tours', symbol: '$$' },
  { id: 'Luxury', label: 'Luxury', desc: '5-star resorts, private transfers & fine dining', symbol: '$$$' },
];

export default function PlannerForm({ onSubmit, initialDestination = 'tokyo-japan', isLoading }) {
  const [destinationId, setDestinationId] = useState(initialDestination);
  const [days, setDays] = useState(4);
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState('Mid-range');
  const [selectedVibe, setSelectedVibe] = useState('Foodie');
  const [promptNotes, setPromptNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      destinationId,
      days,
      travelers,
      budget,
      vibe: selectedVibe,
      notes: promptNotes
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto my-8">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-[#0B3C49] to-[#117A8B] text-white p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#FF6B4A]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold">Configure Your AI Trip Plan</h2>
            <p className="text-xs text-slate-200">Customized day-by-day itineraries, flight estimates & budget breakdowns</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        
        {/* Row 1: Destination & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Destination Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF6B4A]" />
              Select Destination
            </label>
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#117A8B] focus:bg-white text-slate-800 font-semibold rounded-2xl px-4 py-3.5 text-sm outline-none transition-colors"
            >
              {DESTINATION_OPTIONS.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.label}
                </option>
              ))}
            </select>
          </div>

          {/* Trip Duration Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#117A8B]" />
                Trip Duration
              </label>
              <span className="text-sm font-bold text-[#117A8B] bg-[#117A8B]/10 px-3 py-1 rounded-full">
                {days} {days === 1 ? 'Day' : 'Days'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#117A8B] mt-2"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-semibold">
              <span>1 Day Quick Trip</span>
              <span>5 Days</span>
              <span>10 Days Full Explorer</span>
            </div>
          </div>
        </div>

        {/* Row 2: Travelers & Budget Tier */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Travelers selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#117A8B]" />
              Number of Travelers
            </label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTravelers(num)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    travelers === num
                      ? 'bg-[#0B3C49] text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  {num === 1 ? 'Solo (1)' : num === 2 ? 'Couple (2)' : `${num} People`}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Tier */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#117A8B]" />
              Budget Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {BUDGET_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setBudget(tier.id)}
                  className={`py-2.5 px-2 rounded-2xl text-center border transition-all ${
                    budget === tier.id
                      ? 'border-[#FF6B4A] bg-[#FF6B4A]/5 text-[#FF6B4A] font-bold shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold">{tier.symbol} {tier.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Travel Vibe Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#FF6B4A]" />
            Primary Travel Style & Vibe
          </label>
          <div className="flex flex-wrap gap-2.5">
            {VIBES.map((vibe) => {
              const isSelected = selectedVibe === vibe.id;
              return (
                <button
                  key={vibe.id}
                  type="button"
                  onClick={() => setSelectedVibe(vibe.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-[#117A8B] text-white border-[#117A8B] shadow-sm font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{vibe.emoji}</span>
                  <span>{vibe.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Special Requests / AI Prompt Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#117A8B]" />
            Special Requests or Preferences (Optional)
          </label>
          <input
            type="text"
            value={promptNotes}
            onChange={(e) => setPromptNotes(e.target.value)}
            placeholder="e.g. Include vegetarian ramen spots, stay near subway, prefer slow morning walks"
            className="w-full bg-slate-50 border border-slate-200 focus:border-[#117A8B] focus:bg-white text-slate-800 text-xs font-medium rounded-2xl px-4 py-3.5 outline-none transition-colors"
          />
        </div>

        {/* Submit CTA */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6B4A] to-[#E85A39] hover:opacity-95 active:scale-99 text-white font-bold text-base py-4 rounded-2xl shadow-xl shadow-[#FF6B4A]/25 transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Building Your Custom Trip Plan...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Day-by-Day AI Itinerary</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
