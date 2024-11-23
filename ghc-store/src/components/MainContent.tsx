import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/product";

const products: Product[] = [
  {
    id: "1",
    title: "Big Ass Calendar Paper",
    image: "https://via.placeholder.com/150",
    originalPrice: 400,
    currentPrice: 395,
    showAddToCart: true
  },
  {
    id: "2",
    title: "2025 Big Ass Calendar — Paper",
    image: "https://via.placeholder.com/150",
    originalPrice: 400,
    currentPrice: 395
  },
  {
    id: "3",
    title: "2025 Big Ass Calendar — Paper",
    image: "https://via.placeholder.com/150",
    originalPrice: 400,
    currentPrice: 395
  },
  {
    id: "4",
    title: "2025 Big Ass Calendar — Paper",
    image: "https://via.placeholder.com/150",
    originalPrice: 400,
    currentPrice: 395
  }
];

const MainContent: React.FC = () => {
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  
    const handleQuantityChange = (id: string, quantity: number) => {
      setQuantities(prev => ({ ...prev, [id]: quantity }));
    };
  
    return (
      <div className="px-6 py-8">
        <div className="mb-8">
          <a href="/" className="inline-block hover:opacity-80 transition-opacity">
            <h2 className="text-3xl font-medium font-inter">New year — New you →</h2>
          </a>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-inter">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              quantity={quantities[product.id] || 1}
              onQuantityChange={(quantity) => handleQuantityChange(product.id, quantity)}
            />
          ))}
        </div>
        <hr className="mt-6 border-gray-800" />
      </div>
    );
  };

export default MainContent;

