import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { FreeMode } from 'swiper/modules';
import ProductCard from './ProductCard';
import ContentLoader from './ContentLoader';
import { client } from '../lib/client';
import { Product, Category } from '../types/product';
import './MainContent.css';

const CACHE_EXPIRATION_TIME = 1 * 60 * 60 * 1000; // 1 hour in milliseconds

const MainContent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<{ [key: string]: Product[] }>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Add mounted check

    const fetchData = async () => {
      try {
        const now = Date.now();
        const cachedCategories = localStorage.getItem('categories');
        const cachedProducts = localStorage.getItem('productsByCategory');
        const cacheTimestamp = localStorage.getItem('cacheTimestamp');

        // Always show loader initially
        await new Promise(resolve => setTimeout(resolve, 900));

        if (
          cachedCategories &&
          cachedProducts &&
          cacheTimestamp &&
          now - parseInt(cacheTimestamp, 10) < CACHE_EXPIRATION_TIME
        ) {
          if (isMounted) {
            setCategories(JSON.parse(cachedCategories));
            setProductsByCategory(JSON.parse(cachedProducts));
          }
        } else {
          // Fetch fresh data
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

          const groupedProducts = productsData.reduce(
            (acc: { [key: string]: Product[] }, product: Product) => {
              if (product.category && product.category._ref) {
                const categoryId = product.category._ref;
                if (!acc[categoryId]) {
                  acc[categoryId] = [];
                }
                acc[categoryId].push(product);
              }
              return acc;
            },
            {}
          );

          if (isMounted) {
            setCategories(categoriesData);
            setProductsByCategory(groupedProducts);
          }

          localStorage.setItem('categories', JSON.stringify(categoriesData));
          localStorage.setItem('productsByCategory', JSON.stringify(groupedProducts));
          localStorage.setItem('cacheTimestamp', now.toString());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <div className="px-6 py-8">
      {categories.map((category) => (
        <div key={category._id} className="mb-12">
          <div className="mb-8">
            {/* <a
              href={`/category/${category.slug.current}`}
              className="inline-block hover:opacity-80 transition-opacity"
            > */}
              <h2 className="text-3xl font-medium font-inter">{category.title}</h2>
           
          </div>

          <Swiper
            spaceBetween={20}
            slidesPerView="auto"
            freeMode={true}
            modules={[FreeMode]}
            className="mySwiper"
          >
            {productsByCategory[category._id]?.map((product) => (
              <SwiperSlide key={product._id} className="!w-auto">
                <ProductCard
                  {...product}
                  quantity={quantities[product._id] || 1}
                  onQuantityChange={(quantity) => handleQuantityChange(product._id, quantity)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <hr className="mt-8 border-t border-gray-800 w-full" />
        </div>
      ))}
    </div>
  );
};

export default MainContent;