import React from 'react';
import GridLines from 'react-gridlines';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Footer from  './components/Footer'
import { CartProvider } from './context/CartContext';
import StickyCart from './components/StickyCart';

import './App.css'

const App: React.FC = () => {
  return (
    <CartProvider>
    <div className="min-h-screen flex flex-col bg-mainBg">
      <Navbar />
      <GridLines
          lineColor="rgba(0, 0, 0, 0.1)"
          cellWidth={20}
          cellHeight={20}
        >
      <main className="flex-1 relative">
     
          <div className="relative">
            <MainContent />
          </div>
      </main>
        <Footer/>
        </GridLines>
        <StickyCart />
    </div>
    </CartProvider>
  );
};

export default App;

