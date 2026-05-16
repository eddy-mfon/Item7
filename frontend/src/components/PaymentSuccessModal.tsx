import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PaymentSuccessModal({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative overflow-hidden text-center z-10"
          >
            {/* Confetti or decorative background */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <CheckCircle2 size={48} className="text-emerald-500 relative z-10" />
            </div>

            <h2 className="text-3xl font-display font-black text-gray-900 mb-4 tracking-tight">
              Payment Successful!
            </h2>
            
            <p className="text-gray-600 font-medium mb-8 leading-relaxed">
              Thank you for your order. We've received your payment and your receipt has been generated. See you at the pop-up stand!
            </p>

            <button
              onClick={onClose}
              className="w-full bg-gray-950 hover:bg-brand text-white hover:text-gray-950 px-8 py-4 rounded-full font-black transition-all hover:-translate-y-1 shadow-lg shadow-gray-900/20"
            >
              Continue
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
