import React from 'react';
import GridLines from 'react-gridlines';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StickyCart from '../components/StickyCart';
import Tnc from '../components/Tnc';
import ScrollToTop from '../components/ScrollToTop';
import MainContent from '../components/MainContent';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import Contact from '../pages/Contact';
import Shipping from '../pages/Shipping';
import Return from '../pages/Return';
import ProductDetails from '../components/ProductDetails';
import Cart from '../components/Cart';

const AppLayout: React.FC = () => {
  const location = useLocation();

  // Define a set of paths that don't require the main layout (like GridLines or Footer)
  const noGridPages = ['/terms', '/privacy', '/contact', '/shipping', '/returns', '/product/:slug', '/cart'];

  const isNoGridPage = noGridPages.includes(location.pathname) || location.pathname.startsWith('/product/');

  return (
    <div className={`min-h-screen flex flex-col ${isNoGridPage ? '' : 'bg-mainBg'}`}>
      <Navbar />
      <ScrollToTop />
      {isNoGridPage ? (
        <main className="flex-1">
          <Routes>
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Return />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
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
