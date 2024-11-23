import React from 'react';
import { ProductCardProps } from '../types/product';

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  originalPrice,
  currentPrice,
  showAddToCart = false,
  quantity = 1,
  onQuantityChange,
}) => {
  return (
    <div className="flex flex-col w-full max-w-[280px]">
      <div className="bg-white p-6 rounded-2xl mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-auto"
        />
      </div>
      <h3 className="text-base mb-2 text-center font-blueCashews">{title}</h3>
      <div className="flex items-center justify-center gap-2 mb-3 text-sm">
        <span className="text-black/60 line-through">₹{originalPrice}</span>
        <span className="font-medium">₹{currentPrice}</span>
      </div>
      {showAddToCart ? (
        <button 
          className="w-full bg-[#4339F2] text-white py-2 px-4 rounded-full font-medium text-sm hover:bg-[#3329E2] transition-colors h-[42px]"
          aria-label={`Add ${title} to cart`}
        >
          ADD TO CART
        </button>
      ) : (
        <div className="flex items-center justify-between bg-white border border-black/10 rounded-full overflow-hidden h-[42px]">
          <button 
            className="px-4 h-full hover:bg-black/5 transition-colors"
            onClick={() => onQuantityChange?.(Math.max(1, quantity - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="flex-1 text-center font-medium">{quantity}</span>
          <button 
            className="px-4 h-full hover:bg-black/5 transition-colors"
            onClick={() => onQuantityChange?.(quantity + 1)}
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
