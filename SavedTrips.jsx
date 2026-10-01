import React from 'react';
import { Bookmark, Calendar, Users, DollarSign, Trash2, ExternalLink, Sparkles, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export default function SavedTrips({ savedTrips, onLoadSavedTrip, onDeleteSavedTrip, onStartNewTrip, currency }) {
  if (!savedTrips || savedTrips.length === 0) {
    return (
      <div className="max-w-3xl mx-auto my-16 p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-md space-y-6 animate-fadeIn">
        <div className="w-16 h-16 bg-[#117A8B]/10 text-[#117A8B] rounded-2xl flex items-center justify-center mx-auto">
          <Bookmark className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#0B3C49]">No Saved Trips Yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            When you generate a custom itinerary, click "Save Itinerary" to keep track of your favorite travel plans here.
          </p>
        </div>
        <button
          onClick={onStartNewTrip}
          className="inline-flex items-center gap-2 bg-[#FF6B4A] hover:bg-[#E85A39] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Plan Your First Trip</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      <div>
        <h2 className="font-serif text-3xl font-bold text-[#0B3C49]">My Saved Itineraries</h2>
        <p className="text-xs text-slate-500 mt-1">Manage and access your saved travel plans anytime</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedTrips.map((plan) => {
          const dest = plan.destination || {};
          const cost = plan.costSummary || {};
          return (
            <div
              key={plan.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={dest.image || dest.bannerImage}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B4A] bg-white/90 px-2 py-0.5 rounded-full">
                    {plan.durationDays} Days • {plan.vibe}
                  </span>
                  <h3 className="font-serif text-2xl font-bold mt-1">{dest.name}</h3>
                  <div className="text-xs text-slate-300 font-medium">{dest.country}</div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold block">TRAVELERS</span>
                    <span className="font-bold text-slate-800">{plan.travelersCount} Person(s)</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold block">ESTIMATED TOTAL</span>
                    <span className="font-bold text-[#FF6B4A]">{formatCurrency(cost.grandTotal, currency)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    onClick={() => onDeleteSavedTrip(plan.id)}
                    className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-semibold px-3 py-2 rounded-xl hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>

                  <button
                    onClick={() => onLoadSavedTrip(plan)}
                    className="flex items-center gap-2 bg-[#0B3C49] hover:bg-[#09313C] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs"
                  >
                    <span>View Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
