import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { urlFor } from '../lib/client';
import Footer from './Footer';
import Tnc from './Tnc';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, getTotalPrice } = useCart();
  const [localCartItems, setLocalCartItems] = useState(cartItems);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    } else {
      updateQuantity(id, 0);
    }
  };

  const handleImageClick = (slug: string) => {
    navigate(`/product/${slug}`);
  };

  const totalPrice = getTotalPrice();
  const savings = cartItems.reduce((acc, item) => 
    acc + ((item.originalPrice - item.currentPrice) * item.quantity), 0
  );

  if (localCartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-lg font-medium mb-4">Your Cart is Empty</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-[98%] mx-auto px-4 py-8">
        <h1 className="text-lg font-medium font-inter">You're 🤏 this close to kickstarting those habits!</h1>
        <p className="text-sm text-gray-600 border-b pb-4 font-inter">Here's what you've added to your cart</p>

        <div className="space-y-4 py-6">
          {localCartItems.map((item) => (
            <div key={item._id} className="flex items-center gap-4 border border-gray-200 rounded-lg p-6">
              <div 
                onClick={() => handleImageClick(item.slug.current)} 
                className="cursor-pointer hover:opacity-75 transition-opacity"
              >
                <img
                  src={urlFor(item.image).url()}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-blueCashews">{item.title}</h3>
                <div className="text-sm text-gray-500">
                  ₹{item.currentPrice}
                </div>
              </div>
              <div className="flex items-center gap-2 border rounded-md">
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  className="px-3 py-1 text-gray-500 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  className="px-3 py-1 text-gray-500 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Details */}
        <div className="mt-6">
          <h2 className="font-medium mb-1">Bill Details</h2>
          <p className="text-gray-400 mb-6">we love you!</p>
          <div className="space-y-6 text-sm font-inter border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <span>Item total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600 pt-3 border-t border-gray-200 font-medium">
              <span>Savings</span>
              <span>₹{savings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200 font-medium">
              <span>Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200 font-medium">
              <span>To Pay</span>
              <span>₹{(totalPrice - savings).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Checkout
            </button>
            </div>
      </div>
      <Footer />
      <Tnc />
    </div>
  );
};

export default Cart;