import React from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const StickyCart: React.FC = () => {
  const { getTotalItems, getTotalPrice, cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
 
  const savings = cartItems.reduce(
    (acc, item) => acc + (item.defaultPrice.original - item.defaultPrice.current) * item.quantity,
    0
  );
 
  const finalPrice = totalPrice - savings;
 
  if (totalItems === 0) return null;
 
  const isCartPage = location.pathname === '/cart';

  const scrollToForm = () => {
    const formElement = document.querySelector('#checkout-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-20 bg-slate-50">
      <div className="bg-[#4339F2] rounded-2xl px-6 py-4 flex items-center justify-between mx-auto border border-black/10">
        <div className="flex items-center gap-4 text-white">
          <span className="font-medium">
            {totalItems} item{totalItems > 1 ? 's' : ''}
          </span>
          <span className="font-medium">₹{finalPrice.toFixed(0)}</span>
        </div>
        <button
          className="flex items-center gap-2 text-white font-medium hover:opacity-90 transition-opacity"
          onClick={() => isCartPage ? scrollToForm() : navigate('/cart')}
        >
          {isCartPage ? '' : 'CART'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
 };

export default StickyCart;
