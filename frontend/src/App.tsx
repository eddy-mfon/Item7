/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import StepsSection from './components/StepsSection';
import MenuSection from './components/MenuSection';
import PreOrderSection from './components/PreOrderSection';
import Footer from './components/Footer';
import PaymentSuccessModal from './components/PaymentSuccessModal';

export type CartState = {
  [key: string]: number;
};

export const MENU_ITEMS = [
  {
    id: 'beef-shawarma',
    name: 'Beef Shawarma',
    description: 'Juicy, well-filled beef shawarma featuring our signature spicy sauce and crisp veggies.',
    price: 5000,
    image: '/images/beef-shawarma.png',
  },
  {
    id: 'chicken-shawarma',
    name: 'Chicken Shawarma',
    description: 'Tender grilled chicken wrapped with fresh vegetables and creamy garlic sauce.',
    price: 5000,
    image: '/images/chicken-shawarma.png',
  }
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const [cart, setCart] = useState<CartState>({
    'beef-shawarma': 0,
    'chicken-shawarma': 0,
  });

  const location = useLocation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get('status');
    const txRef = params.get('tx_ref');

    // 🚨 TEMP DEBUG LOGS - Open your browser console (F12) to read these!
    console.log("🔍 URL Search Parameters Detected:", location.search);
    console.log("Status key found:", paymentStatus);
    console.log("Transaction Reference found:", txRef);

    if (paymentStatus === 'successful' || paymentStatus === 'success') {
      console.log("✅ Success match identified! Launching modal...");
      setShowSuccessModal(true);
      
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
      
      setCart({
        'beef-shawarma': 0,
        'chicken-shawarma': 0,
      });
    }
  }, [location.search]);

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta)
    }));
  };

  const totalItems: number = (Object.values(cart) as number[]).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#fdfbf7] relative overflow-hidden">
      <ScrollToTop />
      {/* Decorative Global Background Blobs */}
      <div className="absolute top-[10%] left-[-15%] w-[80vw] md:w-[40vw] h-[80vw] md:h-[40vw] bg-brand/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-multiply" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60vw] md:w-[30vw] h-[60vw] md:h-[30vw] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-multiply" />

      <Navbar totalItems={totalItems} />

      <PaymentSuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
      
      <main className="flex-1 relative z-10">
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <StepsSection />
              <AboutSection />
            </>
          } />
          <Route path="/shop" element={
            <>
              <MenuSection items={MENU_ITEMS} cart={cart} updateQuantity={updateQuantity} />
              <PreOrderSection items={MENU_ITEMS} cart={cart} updateQuantity={updateQuantity} />
            </>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
