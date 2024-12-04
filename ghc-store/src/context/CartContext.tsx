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
  defaultPrice: {
    original: number;
    current: number;
  };
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant) => void;
  updateQuantity: (id: string, variantId: string | undefined, quantity: number) => void;
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

  const addToCart = (product: Product, variant?: ProductVariant) => {
    setCartItems(prevItems => {
      // const cartItemId = variant ? `${product._id}-${variant.variantId}` : product._id;
      const existingItem = prevItems.find(i => 
        variant 
          ? i._id === product._id && i.selectedVariant?.variantId === variant.variantId
          : i._id === product._id && !i.selectedVariant
      );

      const price = variant ? variant.price : product.defaultPrice;
      const isFreeProduct = price.current === 0;

      if (existingItem) {
        if (isFreeProduct && existingItem.quantity >= 1) {
          return prevItems;
        }

        return prevItems.map(i =>
          (variant 
            ? i._id === product._id && i.selectedVariant?.variantId === variant.variantId
            : i._id === product._id && !i.selectedVariant)
            ? { ...i, quantity: Math.min(10, i.quantity + 1) }
            : i
        );
      }

      const newItem: CartItem = {
        _id: product._id,
        title: product.title + (variant ? ` - ${variant.colorName}` : ''),
        quantity: 1,
        image: variant?.variantImages?.[0] || product.image,
        baseSlug: product.baseSlug,
        selectedVariant: variant,
        defaultPrice: price
      };

      return [...prevItems, newItem];
    });
  };

  const updateQuantity = (id: string, variantId: string | undefined, quantity: number) => {
    setCartItems(prevItems => {
      const item = prevItems.find(i => 
        variantId 
          ? i._id === id && i.selectedVariant?.variantId === variantId
          : i._id === id && !i.selectedVariant
      );

      if (item && item.defaultPrice.current === 0) {
        quantity = Math.min(1, quantity);
      }

      const newItems = prevItems
        .map(item => (
          (variantId 
            ? item._id === id && item.selectedVariant?.variantId === variantId
            : item._id === id && !item.selectedVariant)
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
    const price = item.selectedVariant?.price?.current || 
                 item.defaultPrice?.current || 
                 0;
    return total + (item.quantity * price);
  }, 0);
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