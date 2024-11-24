import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';

type CartItem = {
  _id: string;
  title: string;
  quantity: number;
  currentPrice: number;
  image: any;
  originalPrice: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Product) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage immediately
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (cartItems.length > 0 || localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i._id === product._id);
      if (existingItem) {
        return prevItems.map(i =>
          i._id === product._id ? { ...i, quantity: Math.min(10, i.quantity + 1) } : i
        );
      }
      const newItem: CartItem = {
        _id: product._id,
        title: product.title,
        quantity: 1,
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
        image: product.image,
      };
      return [...prevItems, newItem];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prevItems => {
      const newItems = prevItems
        .map(item => item._id === id ? { ...item, quantity } : item)
        .filter(item => item.quantity > 0); // Remove items with quantity 0
      
      // Save to localStorage immediately after state change
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.quantity * item.currentPrice), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};