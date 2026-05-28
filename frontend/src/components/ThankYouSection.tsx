import React from 'react';
import { motion } from 'motion/react';
import { Heart, MapPin, Clock, UtensilsCrossed, Instagram, Phone, Mail, Sparkles, Store, ArrowDown } from 'lucide-react';

export default function ThankYouSection() {
  // Staggered child variants for text fade-in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section id="thank-you" className="relative min-h-screen flex flex-col items-center justify-between pt-28 pb-16 overflow-hidden bg-[#faf8f5]">
      {/* Premium Aurora Background Blobs */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Modern Grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        
        {/* Animated Background Spheres */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1], 
              rotate: [0, 120, 0], 
              x: [0, 80, 0], 
              y: [0, -40, 0] 
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[15%] -right-[10%] w-[700px] h-[700px] bg-gradient-to-br from-brand/40 via-orange-400/30 to-rose-400/20 rounded-full blur-[100px] mix-blend-multiply" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.25, 1], 
              rotate: [0, -120, 0], 
              x: [0, -60, 0], 
              y: [0, 60, 0] 
            }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[15%] -left-[10%] w-[800px] h-[800px] bg-gradient-to-tr from-yellow-300/40 via-amber-400/30 to-orange-400/20 rounded-full blur-[120px] mix-blend-multiply" 
          />
        </div>
        
        {/* Huge Scrolling Watermark text */}
        <div className="absolute top-[35%] left-0 w-[200%] overflow-hidden pointer-events-none select-none flex opacity-80">
          <motion.div 
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-8"
          >
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-[17vw] leading-none font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-brand-dark/[0.06] to-brand-dark/[0.01] tracking-tighter">
                ITEM 7 LIVE • THANK YOU • 
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Shawarma Elements (Left and Right) */}
      <motion.div 
        animate={{ 
          y: [0, -18, 0], 
          rotate: [-12, -8, -16, -12],
          scale: [0.95, 1.02, 0.95]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] left-[5%] w-48 h-48 opacity-[0.25] blur-[1px] mix-blend-multiply pointer-events-none hidden lg:block select-none z-10"
      >
        <img src="/images/chicken-shawarma.png" alt="Chicken" className="w-full h-full object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)]" />
      </motion.div>
      <motion.div 
        animate={{ 
          y: [0, 18, 0], 
          rotate: [12, 16, 8, 12],
          scale: [0.95, 1.02, 0.95]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[5%] w-56 h-56 opacity-[0.25] blur-[1px] mix-blend-multiply pointer-events-none hidden lg:block select-none z-10"
      >
        <img src="/images/beef-shawarma.png" alt="Beef" className="w-full h-full object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)]" />
      </motion.div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full flex-1 flex flex-col items-center justify-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.02)] border border-brand/20 text-brand-dark font-extrabold text-[11px] sm:text-xs mb-6 uppercase tracking-widest relative"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
            <span className="relative inline-flex rounded-full h-full w-full bg-brand"></span>
          </span>
          <span className="text-gray-900">Pre-orders Finished</span>
        </motion.div>

        {/* Thank You Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-brand/10 blur-2xl rounded-full" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-800 relative z-10 flex items-center justify-center gap-3 px-6 py-3 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm">
            <Heart className="text-rose-500 fill-rose-500 animate-pulse" size={28} />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Thank you to everyone who pre-ordered!
            </span>
            <Heart className="text-rose-500 fill-rose-500 animate-pulse" size={28} />
          </h2>
        </motion.div>

        {/* Hero Section Card */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full text-center relative"
        >
          {/* Main Title: Sleek, high-impact and minimal text */}
          <motion.h1 
            variants={itemVariants}
            className="text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[10rem] font-display font-black leading-[0.9] tracking-tighter text-gray-950 mb-6 uppercase"
          >
            We Are <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-500 to-rose-500 relative inline-block">
              LIVE.
              <motion.span 
                animate={{ rotate: [0, 10, -10, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-8 text-4xl sm:text-6xl lg:text-8xl"
              >
                🔥
              </motion.span>
            </span>
          </motion.h1>

          <motion.div variants={itemVariants} className="mb-14 mt-12">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('details-card')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex bg-brand text-white px-10 py-5 rounded-full font-black text-lg sm:text-xl uppercase transition-shadow shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(249,115,22,0.6)] items-center gap-3 cursor-pointer group relative overflow-hidden"
            >
              <span className="relative z-10">Find Us Now</span>
              <ArrowDown size={24} className="relative z-10 group-hover:translate-y-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Glassmorphic Details Card: Animates in when scrolled into view with 3D tilt */}
        <motion.div 
          id="details-card"
          initial={{ opacity: 0, y: 100, rotateX: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          whileHover={{ y: -5, shadow: "0_40px_80px_rgba(255,107,53,0.15)" }}
          className="bg-white/60 backdrop-blur-2xl rounded-[36px] sm:rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 sm:p-12 md:p-14 border border-white/50 w-full relative overflow-hidden transition-all duration-300 transform-gpu"
        >
          {/* Subtle brand strip */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand via-orange-500 to-rose-500" />
          
          <div className="grid md:grid-cols-2 gap-8 items-stretch relative z-10 text-left">
            
            {/* Card Left: Address & Directions */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand/10 border border-brand/20 rounded-2xl flex items-center justify-center text-brand">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-1">Our Location</h3>
                  <p className="text-base text-brand font-black mb-2">Covenant University</p>
                  <p className="text-sm text-gray-500 font-bold leading-relaxed">
                    Beside Cafeteria 1 Parking Lot
                  </p>
                </div>
              </div>
              
              <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10 text-brand-dark text-xs font-extrabold flex items-center gap-2">
                <Sparkles size={14} className="shrink-0" />
                <span>Look out for the Item 7 stand next to the lot.</span>
              </div>
            </div>

            {/* Card Right: Live Sales Hours & Contact */}
            <div className="flex flex-col justify-between space-y-6 bg-white/70 border border-white/80 p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand/10 border border-brand/20 rounded-2xl flex items-center justify-center text-brand">
                  <Store size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-1">Stand Hours</h3>
                  <p className="text-sm text-brand font-bold mb-2">May 25th, 2026</p>
                  <p className="text-xs text-gray-500 font-bold leading-relaxed">
                    10:00 AM — Till Sold Out
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                <motion.a 
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:09060079775"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-brand hover:text-white rounded-full text-[11px] font-black text-gray-600 transition-colors shadow-sm border border-gray-100/60"
                >
                  <Phone size={12} /> Call
                </motion.a>
                <motion.a 
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:hello@item7.com"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-brand hover:text-white rounded-full text-[11px] font-black text-gray-600 transition-colors shadow-sm border border-gray-100/60"
                >
                  <Mail size={12} /> Email
                </motion.a>
                <motion.a 
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-brand hover:text-white rounded-full text-[11px] font-black text-gray-600 transition-colors shadow-sm border border-gray-100/60"
                >
                  <Instagram size={12} /> Instagram
                </motion.a>
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>

      {/* Down Bounce Arrow */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="opacity-40 mt-8"
      >
        <ArrowDown size={20} className="text-gray-400" />
      </motion.div>
    </section>
  );
}
