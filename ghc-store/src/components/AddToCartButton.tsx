import React from 'react';
import { useCart } from '../context/CartContext';
import { Product, ProductVariant } from '../types/product';

interface AddToCartButtonProps {
  product: Product;
  selectedVariant?: ProductVariant;
  maxQuantity?: number;
  selectedSize?: string | undefined;  
  disabled?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  product, 
  selectedVariant,
  selectedSize,
  maxQuantity = 10,
  disabled
}) => {
  const { addToCart, cartItems, updateQuantity } = useCart();

  const cartItem = cartItems.find(
    (item) => 
      item._id === product._id && 
      (!selectedVariant ? !item.selectedVariant : item.selectedVariant?.variantId === selectedVariant.variantId) &&
      item.selectedSize === selectedSize
  );

  const handleAddToCart = () => {
    // Check if size is required but not selected
    if (product.sizes && !selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedVariant, selectedSize || undefined);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      updateQuantity(product._id, selectedVariant?.variantId, 0, selectedSize || undefined);
    } else {
      updateQuantity(
        product._id, 
        selectedVariant?.variantId, 
        Math.min(maxQuantity, newQuantity),
        selectedSize || undefined
      );
    }
  };

  // const currentPrice = selectedVariant?.price?.current || product.defaultPrice.current;
  // const originalPrice = selectedVariant?.price?.original || product.defaultPrice.original;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {/* <span className="line-through text-gray-500">₹{originalPrice}</span>
        <span className="font-semibold">₹{currentPrice}</span> */}
      </div>

      {!cartItem ? (
        <button
          className="w-full bg-[#4339F2] text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-[#3329E2] transition h-[50px]"
          onClick={handleAddToCart}
          disabled={disabled}
          aria-label={`Add ${product.title}${selectedVariant ? ` - ${selectedVariant.colorName}` : ''}${selectedSize ? ` - Size ${selectedSize}` : ''} to cart`}        >
          ADD TO CART
        </button>
      ) : (
        <div className="flex items-center justify-between bg-white border border-black/10 rounded-lg overflow-hidden h-[42px]">
          <button
            className="px-4 h-full hover:bg-black/5 transition-colors w-[40%]"
            onClick={() => handleQuantityChange(cartItem.quantity - 1)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="flex-1 text-center font-medium">{cartItem.quantity}</span>
          <button
            className="px-4 h-full hover:bg-black/5 transition-colors w-[40%]"
            onClick={() => handleQuantityChange(cartItem.quantity + 1)}
            disabled={cartItem.quantity >= maxQuantity}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;