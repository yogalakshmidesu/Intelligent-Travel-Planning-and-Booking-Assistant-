import React from 'react';
import { Sparkles, MapPin, Calendar, Users, DollarSign, ArrowRight, ShieldCheck, Compass, HeartHandshake } from 'lucide-react';

export default function Hero({ onStartPlanning, onSelectQuickDestination }) {
  const popularDestinations = [
    { id: 'tokyo-japan', name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80', tag: 'Top Foodie' },
    { id: 'paris-france', name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80', tag: 'Romantic' },
    { id: 'bali-indonesia', name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80', tag: 'Tropical' },
    { id: 'santorini-greece', name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80', tag: 'Scenic' },
    { id: 'reykjavik-iceland', name: 'Reykjavik', country: 'Iceland', image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=400&q=80', tag: 'Adventure' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#E8F1F3]/60 via-white to-slate-50 pt-10 pb-16 border-b border-slate-200/60">
      
      {/* Background Decorative Blur Spheres */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#117A8B]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-20 left-10 w-80 h-80 bg-[#FF6B4A]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CADFE3] shadow-xs text-xs font-semibold text-[#117A8B]">
            <Sparkles className="w-4 h-4 text-[#FF6B4A] animate-spin-slow" />
            <span>AI-Powered Personal Travel Concierge</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0B3C49] leading-tight tracking-tight">
            Dream Trips, <span className="text-[#FF6B4A] underline decoration-[#FF6B4A]/30 decoration-wavy">Custom Created</span> in Seconds.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Tell TripMind where you want to go, your travel style, and budget. Our intelligent engine generates tailored day-by-day itineraries with real-time costs, flight options, and hidden gems.
          </p>

          {/* Primary Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartPlanning}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#117A8B] hover:bg-[#09313C] active:scale-98 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl shadow-[#117A8B]/25 transition-all duration-300 group cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#FF6B4A]" />
              <span>Generate My Custom Itinerary</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Key Value Props */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-600 max-w-xl mx-auto border-t border-slate-200/80">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#117A8B]" />
              <span>100% Free & Custom</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Compass className="w-4 h-4 text-[#117A8B]" />
              <span>Instant Day-by-Day Route</span>
            </div>
            <div className="flex items-center justify-center gap-2 col-span-2 md:col-span-1">
              <HeartHandshake className="w-4 h-4 text-[#117A8B]" />
              <span>Smart Cost Estimation</span>
            </div>
          </div>
        </div>

        {/* Popular Quick-Select Destination Cards */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Popular Trending Destinations</h3>
            <span className="text-xs font-semibold text-[#117A8B]">Click to quick-plan</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {popularDestinations.map((dest) => (
              <div
                key={dest.id}
                onClick={() => onSelectQuickDestination(dest.id)}
                className="group relative rounded-2xl overflow-hidden h-40 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                
                <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[#0B3C49] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {dest.tag}
                </span>

                <div className="absolute bottom-3 left-3 text-white">
                  <div className="font-serif font-bold text-base leading-tight group-hover:text-[#FF6B4A] transition-colors">
                    {dest.name}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">{dest.country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
