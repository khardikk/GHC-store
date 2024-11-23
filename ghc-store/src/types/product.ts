import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface Product {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  image: SanityImageSource;
  originalPrice: number;
  currentPrice: number;
  showAddToCart?: boolean;
  category: {
    _ref: string;
  };
  displayOrder?: number;
}
export interface Category {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    description?: string;
    displayOrder: number;
  }
export interface ProductCardProps extends Omit<Product, 'category' | 'slug' | '_id'> {
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
}