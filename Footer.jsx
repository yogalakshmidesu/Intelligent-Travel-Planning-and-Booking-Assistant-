import React from 'react';
import { Plane, Heart, Mail, Sparkles, Globe } from 'lucide-react';

export default function Footer({ setActiveTab, onStartPlanning }) {
  return (
    <footer className="bg-[#0B3C49] text-white border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#117A8B] to-[#FF6B4A] flex items-center justify-center text-white">
                <Plane className="w-5 h-5 -rotate-45" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                Trip<span className="text-[#FF6B4A]">Mind</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your AI-powered travel planning companion. Creating intelligent day-by-day itineraries, flight estimates, and budget management.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF6B4A]">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><button onClick={() => setActiveTab('planner')} className="hover:text-white">AI Itinerary Planner</button></li>
              <li><button onClick={() => setActiveTab('explore')} className="hover:text-white">Explore Destinations</button></li>
              <li><button onClick={() => setActiveTab('saved')} className="hover:text-white">Saved Travel Plans</button></li>
              <li><button onClick={() => setActiveTab('tools')} className="hover:text-white">Travel Tools & Calculators</button></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF6B4A]">Popular Spots</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><button onClick={onStartPlanning} className="hover:text-white">Tokyo, Japan</button></li>
              <li><button onClick={onStartPlanning} className="hover:text-white">Paris, France</button></li>
              <li><button onClick={onStartPlanning} className="hover:text-white">Bali, Indonesia</button></li>
              <li><button onClick={onStartPlanning} className="hover:text-white">Santorini, Greece</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF6B4A]">Stay Inspired</h4>
            <p className="text-xs text-slate-300">Get weekly curated AI travel guides and flight deals directly to your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 text-white placeholder-slate-400 text-xs px-3 py-2 rounded-xl outline-none focus:ring-1 focus:ring-[#FF6B4A] flex-1"
              />
              <button className="bg-[#FF6B4A] hover:bg-[#E85A39] text-white text-xs font-bold px-3 py-2 rounded-xl">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} TripMind AI Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-[#FF6B4A] fill-current" /> for global travelers.
          </div>
        </div>

      </div>
    </footer>
  );
}
