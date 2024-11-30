import React from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const StickyCart: React.FC = () => {
  const { getTotalItems, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

   // Don't render if on the /cart page
   if (location.pathname === '/cart' || totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50 bg-slate-50">
      <div className="bg-[#4339F2] rounded-2xl px-6 py-4 flex items-center justify-between  mx-auto border border-black/10">
        <div className="flex items-center gap-4 text-white">
          <span className="font-medium">
            {totalItems} item{totalItems > 1 ? 's' : ''}
          </span>
          <span className="font-medium">₹{totalPrice.toFixed(0)}</span>
        </div>
        <button
          className="flex items-center gap-2 text-white font-medium hover:opacity-90 transition-opacity"
          onClick={() => navigate('/cart')}
        >
          CHECKOUT
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StickyCart;

