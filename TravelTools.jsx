import React, { useState } from 'react';
import { DollarSign, ArrowRightLeft, Calculator, ShieldCheck, Check, Globe } from 'lucide-react';
import { CURRENCIES } from '../utils/currency';

export default function TravelTools() {
  const [convAmount, setConvAmount] = useState(100);
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('JPY');

  const [budgetTotal, setBudgetTotal] = useState(1500);

  // Conversion logic
  const rateFrom = CURRENCIES[fromCurr]?.rate || 1;
  const rateTo = CURRENCIES[toCurr]?.rate || 1;
  const convertedValue = Math.round((convAmount / rateFrom) * rateTo);

  // Budget allocation percentages
  const flightsCost = Math.round(budgetTotal * 0.35);
  const stayCost = Math.round(budgetTotal * 0.40);
  const foodCost = Math.round(budgetTotal * 0.15);
  const activitiesCost = Math.round(budgetTotal * 0.10);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="eyebrow-label">Travel Tools & Calculators</span>
        <h2 className="font-serif text-3xl font-bold text-[#0B3C49]">Smart Travel Utilities</h2>
        <p className="text-xs text-slate-600">Quick currency conversion, budget allocation, and packing tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Tool 1: Live Currency Converter */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#117A8B]/10 text-[#117A8B] flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#0B3C49]">Currency Exchange Rate Calculator</h3>
              <p className="text-xs text-slate-500">Live rate estimation</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Amount</label>
              <input
                type="number"
                value={convAmount}
                onChange={(e) => setConvAmount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">From</label>
                <select
                  value={fromCurr}
                  onChange={(e) => setFromCurr(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-3 outline-none"
                >
                  {Object.keys(CURRENCIES).map((c) => (
                    <option key={c} value={c}>{CURRENCIES[c].label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">To</label>
                <select
                  value={toCurr}
                  onChange={(e) => setToCurr(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-3 outline-none"
                >
                  {Object.keys(CURRENCIES).map((c) => (
                    <option key={c} value={c}>{CURRENCIES[c].label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Converted Output Card */}
            <div className="bg-gradient-to-r from-[#0B3C49] to-[#117A8B] text-white p-5 rounded-2xl text-center space-y-1 shadow-md">
              <div className="text-[10px] uppercase font-bold text-slate-300">Converted Equivalent</div>
              <div className="font-serif font-bold text-3xl text-[#FF6B4A]">
                {CURRENCIES[toCurr]?.symbol}{convertedValue.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-200">
                1 {fromCurr} = {((1 / rateFrom) * rateTo).toFixed(2)} {toCurr}
              </div>
            </div>
          </div>
        </div>

        {/* Tool 2: Budget Allocation Estimator */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B4A]/10 text-[#FF6B4A] flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#0B3C49]">Smart Budget Allocator</h3>
              <p className="text-xs text-slate-500">Golden rule of travel budget splitting</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">Total Travel Budget ($)</label>
                <span className="text-xs font-bold text-[#FF6B4A]">${budgetTotal.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="300"
                max="10000"
                step="100"
                value={budgetTotal}
                onChange={(e) => setBudgetTotal(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B4A]"
              />
            </div>

            <div className="space-y-3 pt-2">
              <div className="bg-slate-50 p-3 rounded-xl flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">🏨 Accommodations (40%)</span>
                <span className="font-bold text-[#0B3C49]">${stayCost.toLocaleString()}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">✈️ Flights & Transit (35%)</span>
                <span className="font-bold text-[#0B3C49]">${flightsCost.toLocaleString()}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">🍜 Food & Dining (15%)</span>
                <span className="font-bold text-[#0B3C49]">${foodCost.toLocaleString()}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">🎟️ Sightseeing & Fun (10%)</span>
                <span className="font-bold text-[#0B3C49]">${activitiesCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
