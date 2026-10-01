import React, { useState, useEffect } from 'react';
import { Sparkles, CloudSun, MapPin, DollarSign, Hotel, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Analyzing destination weather & seasonal tips...', icon: CloudSun },
  { id: 2, label: 'Matching top-rated attractions & local hidden gems...', icon: MapPin },
  { id: 3, label: 'Calculating live flight deals & luxury hotel stays...', icon: Hotel },
  { id: 4, label: 'Optimizing daily route map & estimated budget...', icon: DollarSign },
  { id: 5, label: 'Finalizing day-by-day AI itinerary...', icon: Sparkles },
];

export default function GeneratingLoader() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 max-w-2xl mx-auto my-12 text-center space-y-8 animate-fadeIn">
      
      {/* Top Animated Pulse Badge */}
      <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#117A8B] to-[#0B3C49] text-[#FF6B4A] flex items-center justify-center shadow-lg shadow-[#117A8B]/30 animate-pulse">
        <Sparkles className="w-10 h-10 animate-spin-slow" />
      </div>

      <div>
        <h3 className="font-serif text-2xl font-bold text-[#0B3C49]">TripMind AI Engine at Work</h3>
        <p className="text-xs text-slate-500 mt-1">Crafting your personalized travel itinerary with optimal routing</p>
      </div>

      {/* Steps List */}
      <div className="space-y-4 text-left max-w-md mx-auto">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isDone = index < activeStep;
          const isCurrent = index === activeStep;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-4 p-3.5 rounded-2xl border transition-all duration-300 ${
                isDone
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
                  : isCurrent
                  ? 'bg-[#117A8B]/10 border-[#117A8B]/40 text-[#0B3C49] shadow-xs'
                  : 'bg-slate-50/50 border-slate-100 text-slate-400'
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Icon className={`w-5 h-5 ${isCurrent ? 'text-[#FF6B4A] animate-bounce' : 'text-slate-400'}`} />
                )}
              </div>
              <span className={`text-xs font-semibold ${isCurrent ? 'font-bold' : ''}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
