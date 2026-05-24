import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, X, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function CountdownPopup() {
  const [timeLeft, setTimeLeft] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show popup after 3 seconds on first load
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Hide popup on shop page to not obscure ordering
  useEffect(() => {
    if (location.pathname === '/shop') {
      setIsVisible(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const targetDate = new Date('2026-05-27T10:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft('LIVE NOW!');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
      const minutes = Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0');
      const seconds = Math.floor((difference / 1000) % 60).toString().padStart(2, '0');
      
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const intervalId = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.3 } }}
          className="fixed bottom-6 right-6 z-[100] max-w-[280px] w-[calc(100%-3rem)] rounded-3xl p-1 overflow-hidden"
          style={{
            backgroundImage: "linear-gradient(to right, #ff8a00, #e52e71)"
          }}
        >
          <div className="bg-gray-950/90 backdrop-blur-xl rounded-[22px] p-5 shadow-2xl relative">
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full p-1"
            >
              <X size={16} />
            </button>
            
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-2 relative">
                <Timer className="text-white relative z-10 animate-pulse" size={32} strokeWidth={2} />
                <div className="absolute inset-0 bg-brand/50 blur-lg rounded-full" />
              </div>
              
              <h4 className="text-white font-bold text-sm mb-1 tracking-wider uppercase">TradeFair Popup</h4>
              <p className="text-gray-400 text-xs mb-3 font-medium">In front of Cafeteria 1</p>
              
              <div className="flex gap-2 items-center justify-center my-3">
                <span className="font-mono text-xl tracking-widest font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">
                  {timeLeft.replace(/[dDhHmM]/g, ':').replace(/[sS]/g, '')}
                </span>
              </div>

              <Link
                to="/shop"
                className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium text-xs px-4 py-2.5 rounded-full flex items-center justify-center transition-all mt-1"
                onClick={() => setIsVisible(false)}
              >
                Pre-order Now
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
