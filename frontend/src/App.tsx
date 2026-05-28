/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThankYouSection from './components/ThankYouSection';
import Footer from './components/Footer';

export type CartState = {
  [key: string]: number;
};

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#fdfbf7] relative overflow-hidden">
      <ScrollToTop />
      {/* Decorative Global Background Blobs */}
      <div className="absolute top-[10%] left-[-15%] w-[80vw] md:w-[40vw] h-[80vw] md:h-[40vw] bg-brand/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-multiply" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60vw] md:w-[30vw] h-[60vw] md:h-[30vw] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-multiply" />

      <Navbar />

      <main className="flex-1 relative z-10">
        <Routes>
          <Route path="/" element={
            <>
              <ThankYouSection />
            </>
          } />
          <Route path="/shop" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
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
