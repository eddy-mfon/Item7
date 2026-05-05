import React from 'react';
import { motion } from 'motion/react';
import { Utensils, CheckCircle2, ChevronRight, ShoppingBag, Send } from 'lucide-react';
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

  const handleTelegramCheckout = () => {
    if (totalItems === 0) return;

    window.open('https://t.me/item7preordersbot', '_blank');
  };

  return (
    <section id="checkout" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand/5 -skew-x-12 translate-x-16" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#229ED9] via-brand to-rose-400" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-4">
              Finalize Your Order
            </h2>
            <p className="text-gray-600 font-medium">Review your cart and continue to Telegram to secure your order.</p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {/* Order Summary */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-10"
            >
              <h3 className="font-black text-gray-900 mb-8 flex items-center gap-3 text-xl border-b-2 border-brand/20 pb-4 inline-flex">
                <ShoppingBag size={24} className="text-brand" />
                Your Selected Items
              </h3>
              
              {totalItems === 0 ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-gray-50/50">
                    <Utensils size={40} />
                  </div>
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
                  <div className="space-y-3 mb-8">
                    {items.map(item => cart[item.id] > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={item.id} 
                        className="flex justify-between items-center text-sm sm:text-base border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-md p-3 rounded-2xl transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex items-center justify-center bg-gray-900 text-brand font-black w-9 h-9 rounded-full shadow-inner text-sm group-hover:scale-110 transition-transform">
                            {cart[item.id]}<span className="text-xs text-white/50 ml-0.5">x</span>
                          </span>
                          <span className="font-bold text-gray-700 text-lg group-hover:text-brand transition-colors">{item.name}</span>
                        </div>
                        <span className="font-black text-gray-900 text-xl font-mono tracking-tighter">
                          ₦{(item.price * cart[item.id]).toLocaleString()}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-6 border-t-2 border-dashed border-gray-200 flex justify-between items-center bg-gray-50/50 -mx-6 sm:-mx-8 px-6 sm:px-8 mt-2 pb-2 rounded-b-[2rem] relative">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    <span className="font-black text-gray-500 uppercase tracking-widest text-sm">Total Amount</span>
                    <span className="text-4xl font-black text-gray-900 font-mono tracking-tighter">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </motion.div>

            {totalItems > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center relative"
              >
                <div className="bg-[#229ED9]/5 border border-[#229ED9]/20 rounded-3xl p-6 mb-8 w-full text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#229ED9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-[#229ED9] font-bold text-sm tracking-wide relative z-10">
                    Just one tap away from securing your meal!
                  </p>
                </div>
                
                <button 
                  onClick={handleTelegramCheckout}
                  className="w-full sm:w-auto min-w-[320px] bg-gradient-to-r from-[#229ED9] to-[#1d88bb] hover:from-[#1d88bb] hover:to-[#17729d] text-white px-8 py-5 rounded-full font-black text-lg transition-all shadow-[0_10px_40px_rgba(34,158,217,0.3)] hover:shadow-[0_20px_50px_rgba(34,158,217,0.4)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 w-full h-full -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <Send className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform relative z-10" />
                  <span className="relative z-10">Complete on Telegram</span>
                </button>
                <div className="flex items-center gap-2 mt-6 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full border border-emerald-100/50">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <p className="text-sm font-bold uppercase tracking-wider">
                    Payment collected on-site
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
