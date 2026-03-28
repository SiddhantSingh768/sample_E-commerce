import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function Confirmation() {
  const location = useLocation();
  const state = location.state as { orderNumber?: string; email?: string; total?: number } | null;

  if (!state?.orderNumber) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 bg-neutral-50">
      <div className="max-w-md w-full bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-neutral-100 text-center">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-8">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Order Confirmed</h1>
        
        <p className="text-neutral-600 mb-8 leading-relaxed">
          Thank you for your purchase! Your order <span className="font-semibold text-neutral-900">#{state.orderNumber}</span> has been received.
          We've sent a confirmation email to <span className="font-medium text-neutral-900">{state.email}</span>.
        </p>

        {state.total && (
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl p-6 mb-8 border border-indigo-100 shadow-sm">
            <h2 className="text-sm font-bold text-indigo-700 uppercase tracking-wider mb-2">Order Summary</h2>
            <div className="flex justify-between items-center text-lg font-bold text-neutral-900">
              <span>Total Paid</span>
              <span className="text-indigo-600">${state.total.toFixed(2)}</span>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <Link
            to="/products"
            className="w-full flex items-center justify-center bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-base hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]"
          >
            Continue Shopping
            <ArrowRight size={18} className="ml-2" />
          </Link>
          
          <Link
            to="/"
            className="w-full flex items-center justify-center bg-white text-neutral-900 border border-neutral-200 px-8 py-4 rounded-full font-medium text-base hover:bg-neutral-50 transition-colors active:scale-[0.98]"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
