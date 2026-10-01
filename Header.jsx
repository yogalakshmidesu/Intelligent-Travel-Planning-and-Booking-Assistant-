import React, { useState } from 'react';
import { Plane, Compass, Bookmark, Wrench, Sparkles, Menu, X, Globe, PlusCircle } from 'lucide-react';
import { CURRENCIES } from '../utils/currency';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  currency, 
  setCurrency, 
  savedTripsCount, 
  onNewTripClick 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'planner', label: 'AI Planner', icon: Sparkles },
    { id: 'explore', label: 'Explore Destinations', icon: Compass },
    { id: 'saved', label: 'Saved Trips', icon: Bookmark, badge: savedTripsCount },
    { id: 'tools', label: 'Travel Tools', icon: Wrench },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('planner')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#117A8B] to-[#0B3C49] flex items-center justify-center text-white shadow-md shadow-[#117A8B]/20 group-hover:scale-105 transition-transform duration-300">
              <Plane className="w-6 h-6 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#0B3C49]">
                  Trip<span className="text-[#FF6B4A]">Mind</span>
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase bg-[#FF6B4A]/10 text-[#FF6B4A] px-2 py-0.5 rounded-full border border-[#FF6B4A]/20">
                  AI v2.5
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">Intelligent Travel Assistant</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 relative ${
                    isActive 
                      ? 'bg-white text-[#0B3C49] shadow-sm font-bold' 
                      : 'text-slate-600 hover:text-[#0B3C49] hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF6B4A]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span className="ml-1 bg-[#FF6B4A] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Currency Selector */}
            <div className="relative flex items-center gap-1 bg-slate-100 hover:bg-slate-200/70 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-colors">
              <Globe className="w-3.5 h-3.5 text-[#117A8B]" />
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#0B3C49] focus:outline-none cursor-pointer pr-1"
              >
                {Object.keys(CURRENCIES).map((c) => (
                  <option key={c} value={c}>{CURRENCIES[c].label}</option>
                ))}
              </select>
            </div>

            {/* CTA Button */}
            <button
              onClick={onNewTripClick}
              className="hidden sm:flex items-center gap-2 bg-[#FF6B4A] hover:bg-[#E85A39] active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-[#FF6B4A]/25 transition-all duration-200"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Plan New Trip</span>
            </button>

            {/* Mobile Hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-[#117A8B]/10 text-[#117A8B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="bg-[#FF6B4A] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onNewTripClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#FF6B4A] text-white text-sm font-bold py-3 rounded-xl shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Plan New Trip</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
