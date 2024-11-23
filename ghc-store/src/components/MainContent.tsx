import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { client } from '../lib/client';
import { Product, Category } from '../types/product';

const MainContent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<{[key: string]: Product[]}>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories ordered by displayOrder
        const categoriesData = await client.fetch<Category[]>(`
          *[_type == "category"] | order(displayOrder asc) {
            _id,
            title,
            slug,
            description,
            displayOrder
          }
        `);

        // Updated query to properly reference category
        const productsData = await client.fetch<Product[]>(`
          *[_type == "product"] | order(displayOrder asc) {
            _id,
            title,
            slug,
            image,
            originalPrice,
            currentPrice,
            showAddToCart,
            category,  // This returns the reference object directly
            displayOrder
          }
        `);

        // Group products by category using the _ref property
        const groupedProducts = productsData.reduce((acc: {[key: string]: Product[]}, product: Product) => {
          if (product.category && product.category._ref) {
            const categoryId = product.category._ref;
            if (!acc[categoryId]) {
              acc[categoryId] = [];
            }
            acc[categoryId].push(product);
          }
          return acc;
        }, {});

        setCategories(categoriesData);
        setProductsByCategory(groupedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities(prev => ({ ...prev, [id]: quantity }));
  };

  return (
    <div className="px-6 py-8 ">
      {categories.map((category) => (
        <div key={category._id} className="mb-12">
          <div className="mb-8">
            <a href={`/category/${category.slug.current}`} className="inline-block hover:opacity-80 transition-opacity">
              <h2 className="text-3xl font-medium font-inter">{category.title} →</h2>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-inter">
            {productsByCategory[category._id]?.map((product) => (
              <ProductCard
                key={product._id}
                {...product}
                quantity={quantities[product._id] || 1}
                onQuantityChange={(quantity) => handleQuantityChange(product._id, quantity)}
              />
            ))}
          </div>
          <hr className="mt-6 border-gray-800" />
        </div>
      ))}
    </div>
  );
};

export default MainContent;