import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for routing
import Logo from '/logo.svg';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { getTotalItems } = useCart();
  
  return (
    <nav className="flex justify-between items-center py-6 px-6 bg-white z-10 relative">
      <div className="flex items-center">
        <a href='/'><img src={Logo} alt="Logo" /></a>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/cart" className="text-base font-medium font-inter hidden md:block">
          CART ({getTotalItems()})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
