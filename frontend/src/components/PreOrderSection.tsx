import React from 'react';
import { motion } from 'motion/react';
import { Utensils, CheckCircle2, ChevronRight, ShoppingBag, Send, Minus, Plus } from 'lucide-react';
import { CartState } from '../App';

type MenuItem = {
  id: string;
  name: string;
  price: number;
};

type PreOrderSectionProps = {
  items: MenuItem[];
  cart: CartState;
  updateQuantity: (id: string, delta: number) => void;
};

export default function PreOrderSection({ items, cart, updateQuantity }: PreOrderSectionProps) {
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * cart[item.id]), 0);

  // State management: stores form data, loading state, and validation errors
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    matricNumber: '',
    roomNumber: ''
  });
  const [isInitializing, setIsInitializing] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitError, setSubmitError] = React.useState<string>('');

  // Updates form data on input change and clears error for that field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  // Validates all form fields: name (min 3 chars), phone (11-digit Nigerian format), email format, matric number (XX/XXXX), room number, and address
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^0[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid 11-digit Nigerian phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.matricNumber.trim()) {
      newErrors.matricNumber = 'Matric number is required';
    } else if (!/^\d{2}[A-Z]{2}\d{6}$/.test(formData.matricNumber.toUpperCase())) {
      newErrors.matricNumber = 'Use format: 12AB345678 (2 digits, 2 letters, 6 digits)';
    }

    if (!formData.roomNumber.trim()) {
      newErrors.roomNumber = 'Room number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Hostel/Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handles form submission: validates input, formats order details, sends to backend, and redirects to Flutterwave checkout if successful
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totalItems === 0) return;
    if (!validateForm()) return;

    setIsInitializing(true);
    setSubmitError('');

    const orderDetails = items
      .filter(item => cart[item.id] > 0)
      .map(item => `${item.name} (${cart[item.id]}x)`)
      .join('\n');

    try {
      const response = await fetch('https://my-backend-1-s57s.onrender.com/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          orderDetails,
          amount: totalPrice,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const backendMessage = errorData.message || errorData.error || 'Unable to process order';
        throw new Error(`Backend error (${response.status}): ${backendMessage}`);
      }

      const data = await response.json();
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        setSubmitError('Payment initialization failed. No checkout URL received. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);

      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setSubmitError('Network connection error. Please check your internet connection and try again.');
      } else if (error instanceof SyntaxError) {
        setSubmitError('Invalid response from server. Please contact support.');
      } else if (error instanceof Error) {
        if (error.message.includes('Backend error')) {
          setSubmitError(`Server error: ${error.message}. Please try again later.`);
        } else {
          setSubmitError(error.message);
        }
      } else {
        setSubmitError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <section id="checkout" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Checkout section: displays order summary, cart items, and delivery form */}
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand/5 -skew-x-12 translate-x-16" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-white rounded-[30px] sm:rounded-[40px] shadow-2xl p-5 sm:p-8 md:p-12 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#229ED9] via-brand to-rose-400" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-gray-900 mb-4">
              Finalize Your Order
            </h2>
            <p className="text-gray-600 font-medium">Review your cart and provide delivery details to proceed.</p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {/* Order Summary Block: displays cart items with quantity controls or empty state with "Explore Menu" button */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-5 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-10"
            >
              <h3 className="font-black text-gray-900 mb-8 flex items-center gap-3 text-lg sm:text-xl border-b-2 border-brand/20 pb-4 inline-flex">
                <ShoppingBag size={24} className="text-brand" />
                Your Selected Items
              </h3>
              
              {totalItems === 0 ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-gray-50/50">
                    <Utensils size={40} />
                  </div>
                  {/* Empty cart state: shows when no items selected */}
                  <p className="text-gray-500 font-medium mb-8 text-lg">Your tray is empty.<br/>Browse our menu to start your order.</p>
                  <button
                    onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-gray-900 hover:bg-brand text-white px-8 py-4 rounded-full font-bold transition-all text-sm shadow-xl shadow-gray-900/10 hover:-translate-y-1"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart items list: renders each item with minus/plus quantity buttons and total price */}
                  <div className="space-y-3 mb-8">
                    {items.map(item => cart[item.id] > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={item.id} 
                        className="flex justify-between items-center gap-2 text-sm sm:text-base border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-md p-3 rounded-2xl transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                          <div className="flex items-center bg-gray-50/80 rounded-[18px] p-1 border border-gray-100 group-hover:border-brand/20 transition-all shadow-sm">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand hover:bg-white rounded-[14px] transition-all shadow-transparent hover:shadow-sm"
                            >
                              <Minus size={14} strokeWidth={3} />
                            </button>
                            
                            <motion.span 
                              key={cart[item.id]}
                              initial={{ y: 2, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              className="w-7 text-center font-black text-gray-900 text-sm font-mono"
                            >
                              {cart[item.id]}
                            </motion.span>

                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand hover:bg-white rounded-[14px] transition-all shadow-transparent hover:shadow-sm"
                            >
                              <Plus size={14} strokeWidth={3} />
                            </button>
                          </div>
                          <span className="font-bold text-gray-700 text-base sm:text-lg leading-tight group-hover:text-brand transition-colors truncate">{item.name}</span>
                        </div>
                        <span className="font-black text-gray-900 text-lg sm:text-xl font-mono tracking-tighter">
                          ₦{(item.price * cart[item.id]).toLocaleString()}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Total Price Display: shows sum of all cart items */}
                  <div className="pt-6 border-t-2 border-dashed border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 bg-gray-50/50 -mx-5 sm:-mx-8 px-5 sm:px-8 mt-2 pb-2 rounded-b-[2rem] relative">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    <span className="font-black text-gray-500 uppercase tracking-widest text-sm">Total Amount</span>
                    <span className="text-3xl sm:text-4xl font-black text-gray-900 font-mono tracking-tighter">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </motion.div>

            {totalItems > 0 && (
              <motion.form
                onSubmit={handlePayment}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {/* Error notification for submission failures */}
                {submitError && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <p className="text-red-700 font-medium text-sm">{submitError}</p>
                  </div>
                )}

                {/* Delivery Form Block: collects user information (name, phone, email, matric, room, address) with validation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border transition-all font-medium focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-100'}`}
                    />
                    {errors.name && <p className="text-xs text-red-600 ml-1">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 08012345678"
                      className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border transition-all font-medium focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-100'}`}
                    />
                    {errors.phone && <p className="text-xs text-red-600 ml-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <input
                      required
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border transition-all font-medium focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-100'}`}
                    />
                    {errors.email && <p className="text-xs text-red-600 ml-1">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Matric Number</label>
                    <input
                      required
                      name="matricNumber"
                      value={formData.matricNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 12AB345678"
                      className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border transition-all font-medium focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none ${errors.matricNumber ? 'border-red-500 bg-red-50' : 'border-gray-100'}`}
                    />
                    {errors.matricNumber && <p className="text-xs text-red-600 ml-1">{errors.matricNumber}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Room Number</label>
                    <input
                      required
                      name="roomNumber"
                      value={formData.roomNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. A101"
                      className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border transition-all font-medium focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none ${errors.roomNumber ? 'border-red-500 bg-red-50' : 'border-gray-100'}`}
                    />
                    {errors.roomNumber && <p className="text-xs text-red-600 ml-1">{errors.roomNumber}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Hostel/Location</label>
                    <input
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. Daniel Hall"
                      className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border transition-all font-medium focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-100'}`}
                    />
                    {errors.address && <p className="text-xs text-red-600 ml-1">{errors.address}</p>}
                  </div>
                </div>

                <div className="pt-4 flex flex-col items-center">
                  {/* Submit Button: initiates payment process and redirects to Flutterwave checkout */}
                  <button 
                    disabled={isInitializing}
                    type="submit"
                    className="w-full sm:w-auto sm:min-w-[320px] bg-gradient-to-r from-brand to-orange-600 text-white px-8 py-5 rounded-full font-black text-base sm:text-lg transition-all shadow-[0_10px_40px_rgba(255,107,53,0.3)] hover:shadow-[0_20px_50px_rgba(255,107,53,0.4)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isInitializing ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Initializing...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        <span>Pay & Place Order</span>
                      </>
                    )}
                  </button>

                  {/* Flutterwave Badge: displays secure payment provider logo and badge */}
                  <div className="flex items-center gap-4 mt-8 opacity-60">
                    <img src="https://flutterwave.com/images/logo/logo-colored.svg" alt="Flutterwave" className="h-4" />
                    <div className="w-[1px] h-4 bg-gray-300" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Secure Payment</p>
                  </div>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
