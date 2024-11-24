import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ContentLoader from './ContentLoader';
import { client } from '../lib/client';
import { Product, Category } from '../types/product';

const MainContent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<{[key: string]: Product[]}>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const categoriesData = await client.fetch<Category[]>(`
          *[_type == "category"] | order(displayOrder asc) {
            _id,
            title,
            slug,
            description,
            displayOrder
          }
        `);

        const productsData = await client.fetch<Product[]>(`
          *[_type == "product"] | order(displayOrder asc) {
            _id,
            title,
            slug,
            image,
            originalPrice,
            currentPrice,
            showAddToCart,
            category,
            displayOrder
          }
        `);

        await new Promise(resolve => setTimeout(resolve, 500));

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities(prev => ({ ...prev, [id]: quantity }));
  };

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <div className="px-6 py-8">
      {categories.map((category) => (
        <div key={category._id} className="mb-12  flex flex-col justify-center items-center md:flex-none md:justify-normal md:items-baseline lg:flex-none lg:justify-normal lg:items-baseline">
          <div className="mb-8">
            <a href={`/category/${category.slug.current}`} className="inline-block hover:opacity-80 transition-opacity">
              <h2 className="text-3xl font-medium">{category.title} →</h2>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsByCategory[category._id]?.map((product) => (
              <ProductCard
                key={product._id}
                {...product}
                quantity={quantities[product._id] || 1}
                onQuantityChange={(quantity) => handleQuantityChange(product._id, quantity)}
              />
            ))}
          </div>
          <hr className="mt-6 border-t border-gray-800 w-full" />
        </div>
      ))}
    </div>
  );
};

export default MainContent;

