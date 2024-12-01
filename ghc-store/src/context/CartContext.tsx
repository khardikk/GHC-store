import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';

type CartItem = {
  slug: {
    _type: string;
    current: string;
  };
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
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (cartItems.length > 0 || localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product: Product) => {


    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i._id === product._id);
      
      // Check if the product is free (price is 0)
      const isFreeProduct = product.currentPrice === 0;
      
      if (existingItem) {
        // For free products, don't increase quantity beyond 1
        if (isFreeProduct && existingItem.quantity >= 1) {
          return prevItems;
        }
        
        // For paid products, use the original logic with max quantity of 10
        return prevItems.map(i =>
          i._id === product._id 
            ? { ...i, quantity: Math.min(10, i.quantity + 1) }
            : i
        );
      }

      const newItem: CartItem = {
        _id: product._id,
        title: product.title,
        quantity: 1,
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
        image: product.image,
        slug: {
          _type: 'slug',
          current: product.slug.current
        }
      };

      return [...prevItems, newItem];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prevItems => {
      const item = prevItems.find(i => i._id === id);
      
      // If the item is free, limit quantity to 1
      if (item && item.currentPrice === 0) {
        quantity = Math.min(1, quantity);
      }
      
      const newItems = prevItems
        .map(item => item._id === id ? { ...item, quantity } : item)
        .filter(item => item.quantity > 0);

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
      getTotalPrice
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