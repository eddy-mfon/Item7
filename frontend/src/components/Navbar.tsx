import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, UtensilsCrossed, ChevronRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ totalItems = 0 }: { totalItems?: number }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const targetDate = new Date('2026-05-27T10:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft('Pop-up is live!');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      
      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToAbout = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderNowClick = (e: React.MouseEvent) => {
    if (location.pathname === '/shop') {
      e.preventDefault();
      document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="relative z-[60] bg-gray-950 text-white text-center shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand to-transparent opacity-50"></div>
        <p className="py-2 px-3 text-[10px] xs:text-xs tracking-[0.1em] xs:tracking-[0.15em] font-bold uppercase flex flex-row items-center justify-center gap-1.5 opacity-90 relative z-10 w-full overflow-hidden text-center">
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="relative flex h-1.5 w-1.5 xs:h-2 xs:w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-brand"></span>
            </span>
            <span className="text-brand">Online pre-orders closed.</span>
          </span>
          <span className="text-gray-400">Visit our campus stand beside Cafeteria 1 Parking Lot!</span>
        </p>
      </div>

      <div className="fixed top-9 xs:top-10 inset-x-0 z-50 pointer-events-none flex justify-center px-2 xs:px-4 w-full">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className={`pointer-events-auto transition-all duration-500 will-change-transform w-full max-w-5xl rounded-full border flex items-center justify-between shadow-2xl backdrop-blur-2xl px-1.5 py-1.5 xs:px-2 xs:py-2 sm:px-4 sm:py-3 ${
            isScrolled 
              ? 'bg-white/85 border-white/40' 
              : 'bg-white/95 border-white/60'
          }`}
        >
          <Link to="/" className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 cursor-pointer group px-1 xs:px-2 sm:px-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 shrink-0 bg-gray-950 rounded-full flex items-center justify-center group-hover:bg-brand transition-all duration-500 shadow-md transform group-hover:rotate-[360deg]">
              <UtensilsCrossed size={15} strokeWidth={2.5} className="text-white xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5" />
            </div>
            <span className="text-base xs:text-xl sm:text-2xl font-display font-black tracking-tighter text-gray-950 pr-1 xs:pr-2">ITEM 7</span>
          </Link>
          
          <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-auto gap-1 bg-gray-100/50 rounded-full p-1 border border-gray-200/50">
            <button 
              onClick={handleScrollToAbout} 
              className="px-5 py-1.5 rounded-full text-sm font-bold text-gray-500 hover:text-gray-950 hover:bg-white transition-all shadow-sm shadow-transparent hover:shadow-[0_2px_10px_rgba(0,0,0,0.05)] font-sans cursor-pointer"
            >
              Our Story
            </button>
            <button 
              onClick={() => {
                document.getElementById('thank-you')?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="px-5 py-1.5 rounded-full text-sm font-bold text-gray-500 hover:text-gray-950 hover:bg-white transition-all shadow-sm shadow-transparent hover:shadow-[0_2px_10px_rgba(0,0,0,0.05)] font-sans cursor-pointer"
            >
              Find Stand
            </button>
          </div>

          <div className="hidden md:flex items-center">
            <button 
              onClick={() => {
                document.getElementById('thank-you')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative overflow-hidden bg-brand text-gray-950 px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-black transition-all hover:scale-[1.03] active:scale-95 flex items-center gap-3 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] group h-10 sm:h-12 border border-brand/50 cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 hidden lg:block tracking-tight text-[16px] uppercase">Visit Stand</span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-1.5 xs:gap-2 sm:gap-3">
            <button 
              onClick={() => {
                document.getElementById('thank-you')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="overflow-hidden flex items-center justify-center bg-brand text-gray-950 px-3 h-9 xs:h-10 rounded-full shadow-[0_4px_20px_rgba(249,115,22,0.4)] transition-all active:scale-95 border border-brand/50 font-black text-[11px] uppercase cursor-pointer"
            >
              Visit Stand
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 xs:w-10 xs:h-10 rounded-full flex flex-col items-center justify-center gap-[3px] xs:gap-1 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <span className={`w-3.5 xs:w-4 h-[2px] bg-gray-950 transition-all duration-300 origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <span className={`w-3.5 xs:w-4 h-[2px] bg-gray-950 transition-all duration-300 origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
            </button>
          </div>
        </motion.nav>

        {/* Mobile Navigation Dropdown inside a detached block */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[calc(100%+10px)] xs:top-[calc(100%+12px)] left-2 right-2 xs:left-4 xs:right-4 bg-white/95 backdrop-blur-3xl rounded-[1.5rem] xs:rounded-[2rem] border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden pointer-events-auto origin-top p-2 xs:p-3 z-40 md:hidden"
            >
              <div className="flex flex-col gap-0.5 xs:gap-1">
                <button 
                  onClick={() => {
                    handleScrollToAbout();
                    setIsMobileMenuOpen(false);
                  }} 
                  className="w-full text-left text-[15px] xs:text-[17px] font-bold text-gray-950 hover:text-brand hover:bg-gray-50 px-4 xs:px-5 py-3 xs:py-4 rounded-[1.25rem] xs:rounded-[1.5rem] transition-all flex items-center justify-between group cursor-pointer"
                >
                  Our Story <ChevronRight size={16} className="text-gray-300 group-hover:text-brand transition-colors shrink-0" />
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('thank-you')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }} 
                  className="w-full text-left text-[15px] xs:text-[17px] font-bold text-gray-950 hover:text-brand hover:bg-gray-50 px-4 xs:px-5 py-3 xs:py-4 rounded-[1.25rem] xs:rounded-[1.5rem] transition-all flex items-center justify-between group cursor-pointer"
                >
                  Find Stand <ChevronRight size={16} className="text-gray-300 group-hover:text-brand transition-colors shrink-0" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
