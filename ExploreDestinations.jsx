import React, { useState, useEffect } from 'react';
import { Search, MapPin, Sparkles, Filter, Star, Compass, ArrowRight } from 'lucide-react';
import { fetchDestinations } from '../services/api';
import { formatCurrency } from '../utils/currency';

export default function ExploreDestinations({ onSelectDestination, currency }) {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVibe, setSelectedVibe] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [selectedDetail, setSelectedDetail] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await fetchDestinations({
        search,
        category: selectedCategory,
        vibe: selectedVibe,
        budget: selectedBudget
      });
      if (data) {
        setDestinations(data);
      }
    }
    load();
  }, [search, selectedCategory, selectedVibe, selectedBudget]);

  const categories = ['All', 'City Break', 'Beach', 'Mountain'];
  const vibes = ['All', 'Foodie', 'Cultural', 'Romantic', 'Adventure', 'Relaxation'];
  const budgets = ['All', 'Backpacker', 'Mid-range', 'Luxury'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="eyebrow-label">Explore World Destinations</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B3C49]">
          Curated Travel Hotspots & Hidden Gems
        </h2>
        <p className="text-sm text-slate-600">
          Discover top rated places, local costs, and tailor-made AI daily itineraries
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-4 sm:p-6 space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destination, country, or keyword (e.g. Tokyo, France, Foodie)..."
            className="w-full bg-slate-50 border border-slate-200 focus:border-[#117A8B] focus:bg-white text-slate-800 text-sm font-medium rounded-2xl pl-12 pr-4 py-3.5 outline-none transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
          
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Type:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#117A8B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Vibe Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Vibe:</span>
            {vibes.map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVibe(v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedVibe === v
                    ? 'bg-[#FF6B4A] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Destination Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl overflow-hidden group transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Card Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>

                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#0B3C49] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  {dest.budgetTier} Tier
                </span>

                <div className="absolute bottom-3 left-4 text-white">
                  <div className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6B4A]" /> {dest.country}
                  </div>
                  <h3 className="font-serif text-2xl font-bold">{dest.name}</h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>

                {/* Vibe Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {dest.vibe?.map((v, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer / CTA */}
            <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Avg. Daily Cost</div>
                <div className="font-serif font-bold text-base text-[#0B3C49]">
                  {formatCurrency(dest.avgCostPerDay, currency)} <span className="text-[10px] text-slate-500 font-normal">/ day</span>
                </div>
              </div>

              <button
                onClick={() => onSelectDestination(dest.id)}
                className="flex items-center gap-2 bg-[#117A8B] hover:bg-[#09313C] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Plan This Trip</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
