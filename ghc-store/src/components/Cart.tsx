import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { urlFor } from '../lib/client';
import Footer from './Footer';
import Tnc from './Tnc';
import { Product } from '../types/product';
import { LockKeyhole} from 'lucide-react';
import EmptyCart from './EmptyCart';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, getTotalPrice, addToCart } = useCart();
  const [localCartItems, setLocalCartItems] = useState(cartItems);
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Validation
  const isNameValid = /^[a-zA-Z\s'-]{2,50}$/.test(name.trim());
  const isPhoneValid = /^[6-9]\d{9}$/.test(phone);
  const isFormValid = isNameValid && isPhoneValid;

  // Freebie product definition
  const freeProduct: Product = {
    _id: '2e53572e-eebf-441a-a5e8-5c3e40b1b710',
    title: 'The Little Things',
    currentPrice: 0,
    originalPrice: 0,
    quantity: 1,
    category: {
      title: 'goodie-box',
      _ref: 'goodie-box-ref',
    },
    slug: {
      current: 'the-little-things',
    },
    image: {
      _type: 'image',
      asset: {
        _ref: 'image-cc0eab5be8ae574ca5887198fc21e9180525d606-1024x1024-png',
        _type: 'reference',
      },
    },
  };

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

  const handleAddFreebie = () => {
    addToCart(freeProduct);
  };

  const totalPrice = getTotalPrice();
  const savings = cartItems.reduce(
    (acc, item) =>
      acc + (item.originalPrice - item.currentPrice) * item.quantity,
    0
  );

  const isFreeItemInCart = cartItems.some(
    (item) => item._id === freeProduct._id
  );

  const handleCheckout = () => {
    try {
      if (isFormValid) {
      setIsProcessing(true);
      const finalAmount = Math.round((totalPrice - savings) * 100); // Convert to paisa
      
      const options = {
        key: '', // Your test key ID
        amount: finalAmount,
        currency: 'INR',
        name: 'xyz',
        description: 'Purchase Description',
        handler: function (response: any) {
          setIsProcessing(false);
          // Handle successful payment
          const { razorpay_payment_id } = response;
          alert(`Payment Successful! Payment ID: ${razorpay_payment_id}`);
          // Here you would typically:
          // 1. Clear the cart
          // 2. Redirect to a success page
          // 3. Store the order details
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '',
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };
      

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
    } catch (error) {
      console.error('Payment initialization failed:', error);
      setIsProcessing(false);
      alert('Unable to initialize payment. Please try again.');
    }
  };

  if (localCartItems.length === 0) {
    return (
     <EmptyCart/>
    );
  }

  return (
    <div>
      <div className="max-w-[98%] mx-auto px-4 py-8">
     <div className="font-inter flex  flex-col md:flex-row  gap-4 justify-between ">
      <div>
      <h1 className="text-lg font-medium">
        You're 🤏 this close to kickstarting those habits!
      </h1>
      <p className="text-sm text-gray-600  pb-4">
        Add your details and proceed to payment
      </p>
      </div>
      <div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Enter Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1 block w-full p-2 border rounded-md ${
              name && (isNameValid ? 'border-green-500' : 'border-red-500')
            }`}
            placeholder="Enter your name"
            required
          />
          {name && !isNameValid && <p className="text-xs text-red-500 mt-1">Name is required</p>}
        </div>
        <div className="flex-1">
  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
    Enter Phone Number
  </label>
  <div className="flex items-center">
    <span className="px-2 py-2 bg-gray-100 text-gray-700 rounded-l-md border border-gray-300  mt-1">
      +91
    </span>
    <input
      type="tel"
      id="phone"
      value={phone}
      onChange={(e) => {
        const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        if (input.length <= 10) {
          setPhone(input); // Only update with max 10 digits
        }
      }}
      className={`block w-full p-2 border rounded-r-md mt-1 ${
        phone && (isPhoneValid ? 'border-green-500' : 'border-red-500')
      }`}
      placeholder="Enter phone number"
      required
    />
  </div>
  {phone && !isPhoneValid && (
    <p className="text-xs text-red-500 mt-1">
      Enter a valid 10-digit phone number
    </p>
  )}
</div>
{/* Checkout Top */}
        <div className="md:flex md:mt-0 md:justify-center flex-col">
          <button
            className={`w-full md:w-auto px-4 py-2 mt-2 md:mt-5 rounded-lg text-white ${
              isFormValid
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            onClick={handleCheckout}
            disabled={!isFormValid || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
      </div>
    </div>


        {/* Freebie Button */}
        {!isFreeItemInCart && localCartItems.length > 0 && (
          <div className="mt-4 mb-4">
            <button
              onClick={handleAddFreebie}
              className="bg-buttonOrange text-white font-inter px-4 py-2 rounded-xl hover:text-black hover:border-buttonOrange hover:border hover:bg-white flex items-center gap-2 transition-all"
            >
              <span><LockKeyhole /></span>
              UNLOCK FREE GIFT
            </button>
          </div>
        )}

        <div className="space-y-4 py-6">
          {localCartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 border border-gray-200 rounded-lg p-6"
            >
              {item.image && item.image.asset && (
                <img
                  src={urlFor(item.image).url()}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="text-sm font-blueCashews">{item.title}</h3>
                <div className="text-sm text-gray-500">
                  ₹{item.currentPrice}
                  {item.currentPrice === 0 && (
                    <span className="ml-2 text-buttonOrange text-xs">
                      Free gift! 
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 border rounded-md">
                <button
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity - 1)
                  }
                  className="px-3 py-1 text-gray-500 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity + 1)
                  }
                  className="px-3 py-1 text-gray-500 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>



        {/* Forgot Something Section */}
        <div className="flex justify-between items-center p-6 border rounded-xl">
          <div>
            <h2 className=" text-sm  font-blueCashews">Forgot something?</h2>
            <p className="text-xs text-gray-500 max-w-40 md:max-w-full">Keep shopping,
              we've saved your cart for you.</p>
          </div>
          <button 
            className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 font-inter font-medium"
            onClick={() => window.location.href = '/'}
          >
            SHOP
          </button>
        </div>
      
        {/* Bill Details */}
        <div className="mt-6">
          <h2 className="font-medium mb-1">Bill Details</h2>
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
              <span>To Pay</span>
              <span>₹{(totalPrice - savings).toFixed(2)}</span>
            </div>
          </div>
        </div>

          {/* Checkout Button Bottom*/}
          <div className="md:flex  md:mt-6 mt-4 md:justify-center flex-col">
          <button
            className={`w-full md:w-auto px-4 py-2 rounded-lg text-white ${
              isFormValid
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            onClick={handleCheckout}
            disabled={!isFormValid || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </button>
          
        </div>
      </div>
      <Footer />
      <Tnc />
    </div>
  );
};

export default Cart;