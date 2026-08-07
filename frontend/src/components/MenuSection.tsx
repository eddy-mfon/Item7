import React from 'react';
import { motion } from 'motion/react';
import { Minus, Plus, ShoppingBag, Flame, ChefHat } from 'lucide-react';
import { CartState } from '../App';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
};

type MenuSectionProps = {
  items: MenuItem[];
  cart: CartState;
  updateQuantity: (id: string, delta: number) => void;
};

export default function MenuSection({ items, cart, updateQuantity }: MenuSectionProps) {
  
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#fafafa] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center mb-14 sm:mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand-dark font-medium text-sm mb-6">
            <ChefHat size={16} />
            <span>Chef's Choice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black text-gray-900 tracking-tight mb-6">
            Today's <span className="text-brand">Menu</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Fresh, perfectly wrapped shawarma made to order. Pick your favourite and pre-order before we sell out.
          </p>
        </div>

      {/* Menu Cards */}
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-16 sm:mb-24">
        {items.map((item, idx) => {
          const colors = [
            'from-red-300 via-orange-200 to-amber-300',
            'from-yellow-200 via-amber-100 to-orange-200',
          ];
          const gradient = `bg-gradient-to-br ${colors[idx % colors.length]}`;
          
          return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1, duration: 0.5, type: 'spring', damping: 25 }}
            className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-3 sm:p-4 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col group border-2 border-gray-50/50 hover:border-gray-100"
          >
            <div className={`h-[260px] sm:h-[320px] relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] mb-5 sm:mb-6 flex items-center justify-center p-6 sm:p-8 ${gradient}`}>
              <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-contain group-hover:scale-110 lg:group-hover:scale-[1.15] transition-transform duration-700 ease-[0.16,1,0.3,1] drop-shadow-2xl relative z-10"
              />
              
              <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
                {idx === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-1.5 bg-gray-950 text-white px-4 py-2 rounded-full font-bold text-xs shadow-lg border border-gray-800"
                  >
                    <Flame size={14} className="text-orange-500" fill="currentColor" /> Bestseller
                  </motion.div>
                )}
                {item.badge && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-full font-bold text-xs shadow-lg border border-white"
                  >
                    {item.badge}
                  </motion.div>
                )}
              </div>
              
              <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-xl px-5 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center gap-1 border border-white/50 z-20 transition-transform group-hover:-translate-y-1 group-hover:scale-105">
                <span className="text-sm font-bold text-gray-400">₦</span>
                <span className="text-2xl font-black text-gray-950 tracking-tight">{item.price.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="px-3 sm:px-5 pb-4 sm:pb-5 flex flex-col flex-1">
              <div className="mb-4 relative">
                <h3 className="text-2xl sm:text-[28px] font-black font-display text-gray-950 tracking-tight leading-tight mb-2 group-hover:text-brand transition-colors flex items-center justify-between">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed font-medium line-clamp-2 md:line-clamp-none pr-4">{item.description}</p>
                <div className="absolute -left-2 top-0 bottom-0 w-1 rounded-full bg-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                
                {cart[item.id] > 0 ? (
                  <div className="flex items-center w-full sm:flex-1 justify-between bg-gray-100/80 rounded-full p-2 border border-gray-200">
                    <motion.button 
                      whileTap={{ scale: 0.8 }}
                      whileHover={{ scale: 1.15, rotate: -10 }}
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-red-500 transition-all outline-none"
                    >
                      <Minus size={20} strokeWidth={2.5} />
                    </motion.button>
                    <motion.span 
                      key={cart[item.id]} 
                      initial={{ y: 10, opacity: 0 }} 
                      animate={{ y: 0, opacity: 1 }} 
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="font-black text-2xl w-14 text-center text-gray-950 font-display tabular-nums"
                    >
                      {cart[item.id]}
                    </motion.span>
                    <motion.button 
                      whileTap={{ scale: 0.8 }}
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand text-gray-950 shadow-sm flex items-center justify-center hover:bg-orange-500 hover:shadow-orange-500/30 transition-all outline-none"
                    >
                      <Plus size={20} strokeWidth={2.5} />
                    </motion.button>
                  </div>
                ) : (
                  <motion.button 
                    whileTap={{ scale: 0.97 }}
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2.5 bg-gray-950 text-white hover:bg-brand hover:text-gray-950 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-black text-base sm:text-lg transition-all shadow-md group border border-gray-800 hover:border-transparent outline-none"
                  >
                    <ShoppingBag size={20} className="group-hover:-translate-y-0.5 transition-transform" /> Add to Order
                  </motion.button>
                )}

                {cart[item.id] > 0 && (
                  <button 
                    onClick={() => scrollTo('checkout')}
                    className="w-full sm:w-auto bg-gray-950 hover:bg-black text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-black tracking-wide transition-all shadow-md hover:shadow-xl hover:scale-105 active:scale-95 outline-none flex items-center justify-center"
                  >
                    Checkout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
