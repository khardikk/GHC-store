import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant } from '../types/product';

type CartItem = {
  _id: string;
  title: string;
  quantity: number;
  image: any;
  baseSlug: {
    current: string;
    _type?: string;
  };
  selectedVariant?: ProductVariant;
  selectedSize?: string; 
  defaultPrice: {
    original: number;
    current: number;
  };
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, size?: string) => void;
  updateQuantity: (id: string, variantId: string | undefined, quantity: number, size?: string) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void; // to clear cart
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

  const addToCart = (product: Product, variant?: ProductVariant, size?: string) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => 
        variant 
          ? i._id === product._id && 
            i.selectedVariant?.variantId === variant.variantId && 
            i.selectedSize === size
          : i._id === product._id && 
            !i.selectedVariant && 
            i.selectedSize === size
      );
  
      const price = variant ? variant.price : product.defaultPrice;
      const isFreeProduct = price.current === 0;
  
      if (existingItem) {
        if (isFreeProduct && existingItem.quantity >= 1) {
          return prevItems;
        }
  
        return prevItems.map(i =>
          (variant 
            ? i._id === product._id && 
              i.selectedVariant?.variantId === variant.variantId && 
              i.selectedSize === size
            : i._id === product._id && 
              !i.selectedVariant && 
              i.selectedSize === size)
            ? { ...i, quantity: Math.min(10, i.quantity + 1) }
            : i
        );
      }
  
      const newItem: CartItem = {
        _id: product._id,
        title: product.title + 
          (variant ? ` - ${variant.colorName}` : '') + 
          (size ? ` - Size ${size}` : ''),
        quantity: 1,
        image: variant?.variantImages?.[0] || product.image,
        baseSlug: product.baseSlug,
        selectedVariant: variant,
        selectedSize: size,
        defaultPrice: price
      };
  
      return [...prevItems, newItem];
    });
  };

  const updateQuantity = (id: string, variantId: string | undefined, quantity: number, size?: string) => {
    setCartItems(prevItems => {
      const item = prevItems.find(i => 
        variantId 
          ? i._id === id && 
            i.selectedVariant?.variantId === variantId && 
            i.selectedSize === size
          : i._id === id && 
            !i.selectedVariant && 
            i.selectedSize === size
      );
  
      if (item && item.defaultPrice.current === 0) {
        quantity = Math.min(1, quantity);
      }
  
      const newItems = prevItems
        .map(item => (
          (variantId 
            ? item._id === id && 
              item.selectedVariant?.variantId === variantId && 
              item.selectedSize === size
            : item._id === id && 
              !item.selectedVariant && 
              item.selectedSize === size)
            ? { ...item, quantity }
            : item
        ))
        .filter(item => item.quantity > 0);
  
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

 const getTotalPrice = () => {
  return cartItems.reduce((total, item) => {
    const price = item.selectedVariant?.price?.original || 
                 item.defaultPrice?.original || 
                 0;
    return total + (item.quantity * price);
  }, 0);
};

const clearCart = () => {
  setCartItems([]);
  localStorage.removeItem('cart');
};
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice,
      clearCart 
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