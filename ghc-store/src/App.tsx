// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import AppLayout from './layout/AppLayout';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <AppLayout />
      </Router>
    </CartProvider>
  );
};

export default App;
