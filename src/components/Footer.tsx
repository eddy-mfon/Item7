import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Phone, Mail, ArrowUpRight, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white pt-24 pb-12 relative overflow-hidden flex flex-col items-center">
      {/* Top Gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-7xl px-6 relative z-10 flex flex-col">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          
          {/* Brand & Tagline */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <h2 className="text-6xl md:text-8xl leading-none font-display font-black tracking-tighter text-white hover:text-brand transition-colors duration-500 cursor-default select-none mb-6">
              ITEM 7
            </h2>
            <p className="text-gray-400 text-lg font-medium max-w-sm mb-10 leading-relaxed">
              We bring restaurant-quality meals directly to your campus. Fueling your late-night study sessions, one delicious bite at a time.
            </p>
            <div className="flex gap-4">
              <motion.a 
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-brand hover:border-brand shadow-sm hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:hello@item7.com" 
                className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-brand hover:border-brand shadow-sm hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center"
              >
                <Mail size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                href="tel:09060079775" 
                className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-brand hover:border-brand shadow-sm hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center"
              >
                <Phone size={20} />
              </motion.a>
            </div>
          </div>

          {/* Links & Info */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-8 pt-4">
            {/* Pop-up Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold tracking-tight text-white mb-2">Pop-up Details</h3>
              
              <div className="flex items-start gap-4 text-gray-400 group">
                <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center shrink-0 group-hover:bg-brand/20 group-hover:border-brand transition-colors">
                  <MapPin size={18} className="group-hover:text-brand transition-colors" />
                </div>
                <div>
                  <p className="font-bold text-gray-200 mb-1">Covenant University</p>
                  <p className="text-sm">Main Campus, Student Center Area</p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-gray-400 group">
                <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center shrink-0 group-hover:bg-brand/20 group-hover:border-brand transition-colors">
                  <Clock size={18} className="group-hover:text-brand transition-colors" />
                </div>
                <div>
                  <p className="font-bold text-brand mb-1">May 25th, 2026</p>
                  <p className="text-sm">10:00 AM - Till Sold Out</p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold tracking-tight text-white mb-2">Stay Updated</h3>
              <p className="text-gray-400 text-sm">
                Join our newsletter to get notified about our campus location and secret menu items.
              </p>
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="name@student.cu.edu.ng" 
                  className="w-full bg-gray-900 border border-gray-800 rounded-full py-3 pl-5 pr-14 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-white placeholder:text-gray-600"
                />
                <button 
                  type="submit" 
                  className="absolute right-1.5 top-1.5 bottom-1.5 w-10 bg-brand rounded-full flex items-center justify-center text-gray-950 hover:bg-white transition-colors"
                >
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </button>
              </form>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800/50 text-sm font-medium">
          <p className="text-gray-500 mb-4 md:mb-0 text-center md:text-left flex items-center gap-1.5">
            Crafted with love for students by Item 7 © {new Date().getFullYear()}
          </p>
          <div className="flex gap-6 text-gray-500">
            <a href="#" className="hover:text-brand transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
