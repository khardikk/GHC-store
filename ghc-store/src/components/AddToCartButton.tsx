import React from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';

interface AddToCartButtonProps {
  product: Product; // The product object
  maxQuantity?: number; // Optional: Maximum allowed quantity for the product
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, maxQuantity = 10 }) => {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const cartItem = cartItems.find((item) => item._id === product._id);

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      title: product.title,
      slug: product.slug,
      image: product.image,
      originalPrice: product.originalPrice,
      currentPrice: product.currentPrice,
      category: product.category,
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      // Remove the product if quantity is zero
      updateQuantity(product._id, 0);
    } else {
      updateQuantity(product._id, Math.min(maxQuantity, newQuantity));
    }
  };

  return (
    <div>
      {!cartItem ? (
        <button
          className="w-full bg-[#4339F2] text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-[#3329E2] transition h-[50px]"
          onClick={handleAddToCart}
          aria-label={`Add ${product.title} to cart`}
        >
          ADD TO CART
        </button>
      ) : (
        <div className="flex items-center justify-between bg-white border border-black/10 rounded-lg overflow-hidden h-[42px] mt-2">
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
