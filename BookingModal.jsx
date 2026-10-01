import React, { useState } from 'react';
import { X, Plane, Hotel, CheckCircle2, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitBookingApi } from '../services/api';
import { formatCurrency } from '../utils/currency';

export default function BookingModal({ plan, currency, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);

  const dest = plan?.destination || {};
  const cost = plan?.costSummary || {};
  const selectedHotel = dest?.sampleHotels?.[0] || { name: 'Recommended Hotel', pricePerNight: cost.hotelEstimatePerNight || 150 };
  const selectedFlight = dest?.sampleFlights?.[0] || { airline: 'Partner Airline', price: cost.flightEstimatePerPerson || 650 };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    const res = await submitBookingApi({
      planId: plan.id,
      customerName: name,
      email: email,
      flightId: selectedFlight.id,
      hotelId: selectedHotel.id
    });

    setIsSubmitting(false);
    setBookingConfirmation(res);

    // Trigger celebration confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!bookingConfirmation ? (
          <div>
            {/* Modal Header */}
            <div className="bg-[#0B3C49] text-white p-6">
              <div className="flex items-center gap-2 text-[#FF6B4A] text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                TripMind Instant Booking Simulation
              </div>
              <h3 className="font-serif text-xl font-bold">Reserve Trip to {dest.name}</h3>
              <p className="text-xs text-slate-300 mt-1">Flight + Hotel Combined Booking Package</p>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Package Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <Plane className="w-4 h-4 text-[#117A8B]" />
                    <span>{selectedFlight.airline || 'Flight Package'}</span>
                  </div>
                  <span className="font-bold text-slate-800">{formatCurrency(selectedFlight.price, currency)} / person</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <Hotel className="w-4 h-4 text-[#FF6B4A]" />
                    <span>{selectedHotel.name || 'Hotel Stay'}</span>
                  </div>
                  <span className="font-bold text-slate-800">{formatCurrency(selectedHotel.pricePerNight, currency)} / night</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm">
                  <span className="font-bold text-[#0B3C49]">Estimated Total ({plan.travelersCount} Travelers):</span>
                  <span className="font-serif font-bold text-lg text-[#FF6B4A]">
                    {formatCurrency(cost.grandTotal || 1500, currency)}
                  </span>
                </div>
              </div>

              {/* Passenger Form */}
              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name (Primary Guest)</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#117A8B] text-slate-800 text-xs font-semibold rounded-xl px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address for Tickets</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#117A8B] text-slate-800 text-xs font-semibold rounded-xl px-4 py-3 outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No payment charged. Instant test reservation confirmation.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#FF6B4A] hover:bg-[#E85A39] text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-[#FF6B4A]/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{isSubmitting ? 'Confirming Reservation...' : 'Confirm Demo Booking'}</span>
                </button>
              </form>

            </div>
          </div>
        ) : (
          /* Confirmation State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-[#0B3C49]">Booking Confirmed!</h3>
              <p className="text-xs text-slate-600 mt-1">{bookingConfirmation.message}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking Reference:</span>
                <span className="font-mono font-bold text-[#FF6B4A]">{bookingConfirmation.bookingReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-semibold text-slate-800">{dest.name}, {dest.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Passenger:</span>
                <span className="font-semibold text-slate-800">{name}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#0B3C49] text-white font-bold text-xs py-3 rounded-xl hover:bg-[#09313C]"
            >
              Back to Itinerary
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
