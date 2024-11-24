import React from 'react';
import Logo from '/logo.png';
const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white z-10 relative">
      <div className="flex items-center">
        <a href='/'><img src={Logo} /></a>
      </div>
      <div>
        <h4 className="text-base font-medium font-inter hidden md:block">CART (4)</h4>
      </div>
    </nav>
  );
};

export default Navbar;

