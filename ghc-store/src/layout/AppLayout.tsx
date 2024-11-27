import React from 'react';
import GridLines from 'react-gridlines';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StickyCart from '../components/StickyCart';
import Tnc from '../components/Tnc';
import { useLocation, Routes, Route } from 'react-router-dom';
import MainContent from '../components/MainContent';
import Terms from '../pages/Terms';
import ScrollToTop from '../components/ScrollToTop';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isTermsPage = location.pathname === '/terms'; // Check for /terms page

  return (
    <div className={`min-h-screen flex flex-col ${isTermsPage ? '' : 'bg-mainBg'}`}>
      <Navbar />
      <ScrollToTop />
      {isTermsPage ? (
        <main className="flex-1">
          <Routes>
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
      ) : (
        <GridLines lineColor="rgba(0, 0, 0, 0.1)" cellWidth={20} cellHeight={20}>
          <main className="flex-1 relative">
            <div className="relative">
              <Routes>
                <Route path="/" element={<MainContent />} />
              </Routes>
            </div>
          </main>
          <Footer />
          <Tnc />
        </GridLines>
      )}
      <StickyCart />
    </div>
  );
};

export default AppLayout;
