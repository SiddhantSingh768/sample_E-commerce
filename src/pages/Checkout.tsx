import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CreditCard, Lock, ChevronRight } from 'lucide-react';

export function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    country: 'United States',
    postalCode: '',
    cardNumber: '',
    expDate: '',
    cvc: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      const orderTotal = cartTotal + (cartTotal > 50 ? 0 : 10) + (cartTotal * 0.08);
      navigate('/confirmation', { state: { orderNumber: `ORD-${Math.floor(Math.random() * 1000000)}`, email: formData.email, total: orderTotal } });
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Your cart is empty</h2>
        <p className="text-neutral-500 mb-8">Add some items to your cart before checking out.</p>
        <Link to="/products" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-neutral-900 hover:bg-neutral-800">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const shipping = cartTotal > 50 ? 0 : 10;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  return (
    <div className="bg-neutral-50 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center text-sm font-medium text-neutral-500 mb-8">
          <Link to="/products" className="hover:text-indigo-600 transition-colors">Shop</Link>
          <ChevronRight size={16} className="mx-2 text-indigo-300" />
          <span className="text-indigo-900 font-semibold">Checkout</span>
        </nav>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Contact Info */}
              <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-neutral-100">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Contact Information</h2>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  />
                </div>
              </section>

              {/* Shipping Address */}
              <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-neutral-100">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">First name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border border-neutral-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">Last name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border border-neutral-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-neutral-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border border-neutral-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full border border-neutral-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-neutral-700 mb-1">Country</label>
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full border border-neutral-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent bg-white"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-neutral-700 mb-1">Postal code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full border border-neutral-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    />
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-neutral-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-neutral-900">Payment</h2>
                  <div className="flex items-center text-neutral-500 text-sm">
                    <Lock size={16} className="mr-1" /> Secure
                  </div>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
                  <p className="text-sm text-indigo-700 mb-2 font-medium">This is a demo. Please use fake payment details.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-neutral-700 mb-1">Card number</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        required
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 rounded-md py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                      />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expDate" className="block text-sm font-medium text-neutral-700 mb-1">Expiration date (MM/YY)</label>
                      <input
                        type="text"
                        id="expDate"
                        name="expDate"
                        required
                        placeholder="MM/YY"
                        value={formData.expDate}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-neutral-700 mb-1">CVC</label>
                      <input
                        type="text"
                        id="cvc"
                        name="cvc"
                        required
                        placeholder="123"
                        value={formData.cvc}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {isSubmitting ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-10 lg:mt-0">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-neutral-100 sticky top-24">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Order Summary</h2>
              
              <ul className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-neutral-100">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <div className="flex justify-between text-sm font-medium text-neutral-900">
                        <h3 className="line-clamp-1 pr-4">{item.name}</h3>
                        <p className="whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-neutral-500">Qty {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-neutral-200 pt-6 space-y-4">
                <div className="flex justify-between text-sm text-neutral-600">
                  <p>Subtotal</p>
                  <p className="font-medium text-neutral-900">${cartTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-neutral-600">
                  <p>Shipping</p>
                  <p className="font-medium text-neutral-900">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
                </div>
                <div className="flex justify-between text-sm text-neutral-600">
                  <p>Taxes (Estimated)</p>
                  <p className="font-medium text-neutral-900">${tax.toFixed(2)}</p>
                </div>
                <div className="border-t border-neutral-200 pt-4 flex justify-between">
                  <p className="text-base font-bold text-neutral-900">Total</p>
                  <p className="text-xl font-bold text-neutral-900">${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
