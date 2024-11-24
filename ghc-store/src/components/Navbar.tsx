import React from 'react';
import Logo from '/logo.svg';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { getTotalItems, getTotalPrice } = useCart();
  
  return (
    <nav className="flex justify-between items-center py-6 px-6 bg-white z-10 relative">
      <div className="flex items-center">
        <a href='/'><img src={Logo} alt="Logo" /></a>
      </div>
      <div className="flex items-center gap-2">
        <h4 className="text-base font-medium font-inter hidden md:block">
          CART ({getTotalItems()}) - ₹{getTotalPrice().toFixed(2)}
        </h4>
      </div>
    </nav>
  );
};

export default Navbar;