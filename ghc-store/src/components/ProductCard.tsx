import React from 'react';
import { ProductCardProps } from '../types/product';
import { urlFor } from '../lib/client';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard: React.FC<ProductCardProps & { _id: string }> = ({
  _id,
  title,
  image,
  originalPrice,
  currentPrice,
  slug
}) => {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const cartItem = cartItems.find(item => item._id === _id);

  const handleAddToCart = () => {
    addToCart({
      _id,
      title,
      slug: { current: '' },
      image,
      originalPrice,
      currentPrice,
      category: {
        _ref: '',
        title: ''
      },
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    // Call updateQuantity and remove item if newQuantity is 0
    updateQuantity(_id, newQuantity);
  };

  return (
    <div className="flex flex-col w-full max-w-[280px]">
       <Link to={`/product/${slug.current}`}>
      <div className="bg-white rounded-2xl mb-4">
        <img
          src={urlFor(image).quality(100).url()}
          alt={title}
          className="w-full h-auto object-cover rounded-lg"
          loading="lazy"
        />
      </div>
      </Link>
      <h3 className="text-base mb-2 text-center font-blueCashews">{title}</h3>
      <div className="flex items-center justify-center gap-2 mb-3 text-sm">
        <span className="text-black/60 line-through">₹{originalPrice}</span>
        <span className="font-medium">₹{currentPrice}</span>
        {cartItem && (
          <span className="font-medium text-[#4339F2]">
            × {cartItem.quantity} = ₹{(currentPrice * cartItem.quantity).toFixed(2)}
          </span>
        )}
      </div>
      {!cartItem ? (
        <button 
          className="w-full bg-[#4339F2] text-white py-2 px-4 rounded-full font-medium text-sm hover:bg-[#3329E2] transition-colors h-[42px]"
          onClick={handleAddToCart}
          aria-label={`Add ${title} to cart`}
        >
          ADD TO CART
        </button>
      ) : (
        <div className="flex items-center justify-between bg-white border border-black/10 rounded-full overflow-hidden h-[42px]">
          <button 
            className="px-4 h-full hover:bg-black/5 transition-colors"
            onClick={() => handleQuantityChange(cartItem.quantity - 1)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="flex-1 text-center font-medium">{cartItem.quantity}</span>
          <button 
            className="px-4 h-full hover:bg-black/5 transition-colors"
            onClick={() => handleQuantityChange(Math.min(10, cartItem.quantity + 1))}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};


export default ProductCard;