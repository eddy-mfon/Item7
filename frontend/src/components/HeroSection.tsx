import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Flame, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 overflow-hidden bg-[#fcfaf8]">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Modern Grid */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        
        {/* Animated Aurora Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-gradient-to-br from-brand/50 via-orange-400/40 to-rose-400/20 rounded-full blur-[90px] mix-blend-multiply" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0], x: [0, -100, 0], y: [0, 100, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -left-[10%] w-[900px] h-[900px] bg-gradient-to-tr from-yellow-400/50 via-amber-500/40 to-orange-400/30 rounded-full blur-[100px] mix-blend-multiply" 
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], x: [0, 50, -50, 0], y: [0, 50, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-brand/40 rounded-full blur-[80px] mix-blend-multiply" 
          />
        </div>

        {/* Huge Watermark Typography */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden flex justify-center pointer-events-none select-none">
            <motion.span 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-[17vw] leading-none font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-brand-dark/[0.12] to-brand-dark/[0.04] whitespace-nowrap tracking-tighter"
            >
              ITEM 7 POP-UP
            </motion.span>
        </div>

        {/* Noise Overlay for Texture */}
        <div className="absolute inset-0 mix-blend-overlay opacity-[0.25] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* Hero Text */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-brand/20 text-brand-dark font-bold text-sm mb-8 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-brand/5 group-hover:bg-brand/10 transition-colors duration-300" />
          <Flame size={16} className="text-brand relative fill-brand/20" />
          <span className="uppercase tracking-widest text-[11px] sm:text-xs relative text-gray-900">
            May 25th <span className="text-gray-300 mx-2">•</span> In front of Cafeteria 1
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-[2.35rem] sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[1.05] tracking-tight text-gray-950 mb-8 relative w-full flex flex-col items-center"
        >
          {/* Decorative badges around the text */}
          <div className="absolute -top-6 left-[5%] lg:left-[18%] rotate-[-6deg] opacity-90 hidden md:block pointer-events-none hover:rotate-0 transition-transform duration-500 hover:scale-105">
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-yellow-950 text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-yellow-200 shadow-md flex items-center gap-1.5 backdrop-blur-md">
              <Star size={14} className="fill-current" /> Limited Supply
            </span>
          </div>
          <div className="absolute bottom-12 right-[5%] lg:right-[18%] rotate-[8deg] opacity-90 hidden md:block pointer-events-none hover:rotate-0 transition-transform duration-500 hover:scale-105">
            <span className="bg-gradient-to-r from-brand to-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5 backdrop-blur-md">
              <Flame size={14} className="fill-current" /> Hot & Fresh
            </span>
          </div>

          <span className="block mb-1 relative z-10">
            Taste the <span className="font-display text-transparent bg-clip-text bg-gradient-to-br from-brand via-orange-500 to-rose-500 pr-2">Hype.</span>
          </span>
          <span className="block relative z-10">
            Skip the <span className="relative inline-block mt-1 sm:mt-0"><span className="relative z-10 text-gray-950">Line.</span><span className="absolute bottom-[10%] left-[-5%] w-[110%] h-[30%] bg-brand/20 -z-10 rounded-full"></span></span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Item 7 brings premium, mouth-watering beef and chicken shawarmas directly to you. Secure your spot before we <span className="text-brand font-black border-b-4 border-brand/30 pb-0.5">sell out.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20 md:mb-32 w-full sm:w-auto"
        >
          <Link 
            to="/shop"
            className="bg-gray-950 hover:bg-brand text-white hover:text-gray-950 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-black text-base sm:text-lg transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_40px_rgba(249,115,22,0.4)] flex items-center justify-center gap-3 group w-full sm:w-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-0" />
            <span className="relative z-10 flex items-center gap-3">
              Order Now
              <ArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" size={20} strokeWidth={3} />
            </span>
          </Link>
          <Link 
            to="/shop"
            className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-100 hover:border-gray-200 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto flex items-center justify-center"
          >
            Explore Menu
          </Link>
        </motion.div>
      </div>

      {/* Bento Layout Images */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 hidden md:block">
        <div className="grid grid-cols-12 gap-6 h-[500px]">
          {/* Left Large Column (Beef Shawarma) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="col-span-5 h-[500px] rounded-[2.5rem] overflow-hidden relative shadow-2xl group translate-y-6 bg-gradient-to-br from-orange-300 via-rose-300 to-rose-400"
          >
            <img 
              src="/images/beef-shawarma.png"
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
              alt="Beef Shawarma" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-sm text-gray-950">
              <Flame className="text-orange-500" size={16}/> Bestseller
            </div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-3xl font-black mb-1">Beef Shawarma</h3>
              <p className="text-white/80 font-medium">Spicy sauce & crisp veggies</p>
            </div>
          </motion.div>

          {/* Center Column (Stats) */}
          <div className="col-span-3 flex flex-col justify-center h-[500px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-[60%] bg-brand rounded-[2.5rem] relative p-8 flex flex-col justify-center items-center text-white shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)] blur-md" />
              <div className="text-5xl font-black mb-1 relative z-10">200+</div>
              <div className="text-white/90 font-medium text-lg text-center leading-tight relative z-10 max-w-[150px]">
                Pre-orders secured
              </div>
              <div className="flex gap-1 mt-4 text-yellow-300 relative z-10">
                <Star className="fill-current" size={18}/>
                <Star className="fill-current" size={18}/>
                <Star className="fill-current" size={18}/>
                <Star className="fill-current" size={18}/>
                <Star className="fill-current" size={18}/>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Chicken Shawarma) */}
          <motion.div 
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="col-span-4 h-[500px] rounded-[2.5rem] overflow-hidden relative shadow-2xl group bg-gradient-to-br from-yellow-300 via-amber-300 to-orange-400"  
          >
             <img 
              src="/images/chicken-shawarma.png"
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl translate-y-4"
              alt="Chicken Shawarma" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white pr-4">
              <h3 className="text-2xl font-black mb-1 leading-tight">Chicken Shawarma</h3>
              <p className="text-white/80 font-medium">Tender grilled chicken</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Single Image Fallback */}
      <div className="w-full px-4 sm:px-6 relative z-10 md:hidden pb-12 mt-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[320px] sm:h-[400px] rounded-[2.5rem] overflow-hidden relative shadow-2xl group bg-gradient-to-br from-orange-300 via-rose-300 to-rose-400"
          >
            <img 
              src="/images/chicken-shawarma.png" 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl pb-10"
              alt="Chicken Shawarma" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-3xl font-black mb-1">Pop-up Menu</h3>
              <p className="text-white/80 font-medium">Explore our premium selection</p>
            </div>
          </motion.div>
      </div>
    </section>
  );
}
