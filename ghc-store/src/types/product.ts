export interface Product {
    id: string;
    title: string;
    image: string;
    originalPrice: number;
    currentPrice: number;
    showAddToCart?: boolean;
  }
  
  export interface ProductCardProps extends Product {
    quantity?: number;
    onQuantityChange?: (quantity: number) => void;
  }
  