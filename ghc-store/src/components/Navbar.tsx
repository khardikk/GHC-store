import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white z-10 relative">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold mr-2">General Habit Store</h1>
        <span className="text-xl">By Good Habits Club</span>
      </div>
      <div>
        <h4 className="text-lg font-medium">CART (4)</h4>
      </div>
    </nav>
  );
};

export default Navbar;

