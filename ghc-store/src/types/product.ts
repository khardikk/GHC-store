import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Product Interface
export interface Product {
  _id: string;
  title: string;
  quantity?: number; 
  slug: {
    current: string;
    _type?: string; // Optional if _type is not always needed
  };
  image: SanityImageSource; // Main product image
  originalPrice: number;
  currentPrice: number;
  showAddToCart?: boolean; // Optional flag for Add to Cart button
  category: {
    title: string;
    _ref: string;
  };
  additionalImages?: SanityImageSource[]; // Additional images for the product
  displayOrder?: number;

  // Variants for the product (e.g., color options)
  variants?: {
    colorName: string; // Name of the color variant
    colorHex: string;  // HEX code for the color
    variantImages: SanityImageSource[]; // Images specific to this variant
  }[];
}


// Category Interface
export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string; // Optional description for the category
  displayOrder: number; // Determines the display order of categories
}

// Props for the ProductCard Component
export interface ProductCardProps extends Omit<Product, 'category' | '_id'> {
  slug: {
    current: string;
  }; // Include slug
  _id: string; // Include _id if needed
  quantity?: number; // Optional quantity for the product
  onQuantityChange?: (quantity: number) => void; // Optional handler for quantity changes
}

export interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentImageIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}