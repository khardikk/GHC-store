import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readClient as client, urlFor } from "../lib/client";
import { ImageModalProps, Product, ProductVariant } from "../types/product";
import ContentLoader from "../components/ContentLoader";
import Tnc from "./Tnc";
import Footer from "./Footer";
import AddToCartButton from "./AddToCartButton";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useSwipeable } from "react-swipeable";

type CategoryReference = {
  _ref: string;
  title: string;
}

type SimilarProductsProps = {
  currentProductId: string;
  category: CategoryReference;
}
// ImageModal Component
const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  images,
  currentImageIndex,
  onPrevious,
  onNext,
}) => {
  if (!isOpen) return null;
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrevious();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onClose, onPrevious, onNext]);

  // Configure swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => onNext(),
    onSwipedRight: () => onPrevious(),
    preventScrollOnSwipe: true,
    trackMouse: true,
    swipeDuration: 500,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
      >
        <X className="w-8 h-8" />
      </button>

      <button
        onClick={onPrevious}
        disabled={currentImageIndex === 0}
        className="absolute left-4 text-white hover:text-gray-300 disabled:opacity-50 z-50"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Swipeable container */}
      <div
        {...swipeHandlers}
        className="w-full h-full flex items-center justify-center touch-pan-y"
      >
        <img
          src={images[currentImageIndex]}
          alt={`Product view ${currentImageIndex + 1}`}
          className="max-h-[90vh] max-w-[90vw] object-contain select-none"
          draggable="false"
        />
      </div>

      <button
        onClick={onNext}
        disabled={currentImageIndex === images.length - 1}
        className="absolute right-4 text-white hover:text-gray-300 disabled:opacity-50 z-50"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Image counter */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
        {currentImageIndex + 1} / {images.length}
      </div>

      {/* Swipe hint - shows only on touch devices */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full touch-device-only">
        Swipe to navigate
      </div>
    </div>
  );
};

const SimilarProducts = ({ currentProductId, category }: SimilarProductsProps) => {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log('Category:', category); // Debug log
    
    const fetchSimilarProducts = async () => {
      setIsLoading(true);
      try {
        // console.log('Fetching similar products with:', { 
        //   categoryId: category._ref, 
        //   currentProductId 
        // }); // Debug log
        
        const products = await client.fetch<Product[]>(
          `*[_type == "product" && category._ref == $categoryId && _id != $currentProductId][0...4]{
            _id,
            title,
            baseSlug,
            image,
            defaultPrice,
            showAddToCart,
            category->{
              title,
              _ref
            }
          }`,
          { 
            categoryId: category._ref,
            currentProductId 
          }
        );
        
        // console.log('Fetched products:', products); // Debug log
        setSimilarProducts(products);
      } catch (error) {
        console.error('Error fetching similar products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (category?._ref) {
      fetchSimilarProducts();
    }
  }, [category, currentProductId]);

  if (isLoading) return <div>Loading similar products...</div>;
  if (!similarProducts.length) return null;


  return (
    <div className="mt-12 mb-12 md:mb-40 md:mt-20">
      <h2 className="text-xl font-medium mb-6 font-blueCashews">You may also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {similarProducts.map((product) => (
          <div key={product._id} className="space-y-2">
            <a href={`/product/${product.baseSlug.current}`} className="block">
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <img 
                  src={urlFor(product.image).url()} 
                  alt={product.title}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h3 className="font-medium text-sm mt-2">{product.title}</h3>
              <div className="flex items-center gap-2">
                <span className="line-through text-gray-500">₹{product.defaultPrice.original}</span>
                <span className="font-medium">₹{product.defaultPrice.current}</span>
              </div>
            </a>
            {product.showAddToCart && (
              <AddToCartButton
                product={product}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main ProductDetails Component
const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const productData = await client.fetch<Product>(
          `*[_type == "product" && baseSlug.current == $slug][0]{
            _id,
            title,
            baseSlug,
            baseColor,
            image,
            additionalImages,
            defaultPrice,
            showAddToCart,
          "category": category->{
          _id,
          title,
          "_ref": _id 
        },
            variants[] {
              variantId,
              colorName,
              colorHex,
              variantSlug,
              variantImages,
              price
            }
          }`,
          { slug }
        );
        setProduct(productData);
        setSelectedVariant(null);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (isLoading) return <ContentLoader />;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  const sections = [
    {
      title: "Product Details",
      content: (
        <ul className="list-disc pl-5 space-y-1 text-gray-500 text-sm font-normal">
          <li>I'm a software engineer by profession, having worked at...</li>
          <li>
            A couple of startups, anything code-related is something that I can
            pick up.
          </li>
          <li>I'm super into planning for events and organizing them.</li>
        </ul>
      ),
    },
    {
      title: "Shipping",
      content: (
        <p className="text-gray-500 text-sm font-normal">
          Free shipping for orders over ₹500.
        </p>
      ),
    },
    {
      title: "Return Policy",
      content: (
        <p className="text-gray-500 text-sm font-normal">
          7-day return policy on unused items.
        </p>
      ),
    },
  ];

  // const handleVariantSelection = (variant: { colorName: string; variantImages: any[] }) => {
  //   setSelectedVariant(variant);
  // };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      Math.min(displayImages.length - 1, prev + 1)
    );
  };

  const displayTitle = selectedVariant
    ? `${product?.title} - ${selectedVariant.colorName}`
    : product?.title;

    const getDisplayImages = () => {
      if (selectedVariant?.variantImages?.length) {
        return selectedVariant.variantImages;
      }
      
      const images: any[] = [];
      if (product?.image) {
        images.push(product.image);
      }
      if (product?.additionalImages?.length) {
        images.push(...product.additionalImages);
      }
      return images;
    };

  const displayImages = getDisplayImages();

  const currentPrice = selectedVariant
    ? selectedVariant.price.current
    : product?.defaultPrice.current;
  const originalPrice = selectedVariant
    ? selectedVariant.price.original
    : product?.defaultPrice.original;

  return (
    <div>
      <div className="max-w-[98%] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side: Image Grid */}
          <div className="md:w-2/3">
            <div className="grid grid-cols-2 gap-4">
              {displayImages.slice(0, 10).map((img, index) => (
                <div
                  key={index}
                  className="overflow-hidden cursor-pointer group"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={urlFor(img).quality(80).auto('format').url()}
                    alt={`Product Image ${index + 1}`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Product Details */}
          <div className="product-details md:w-1/3 max-h-full md:max-h-screen scrollbar-hide sticky top-10">
            <div className="border rounded-xl p-6 space-y-6">
              <div>
                <h1 className="text-2xl font-medium mb-4 font-blueCashews">
                  {displayTitle}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="line-through font-inter text-base text-gray-500">
                    ₹{originalPrice}
                  </span>
                  <span className="font-inter text-base font-semibold">
                    ₹{currentPrice}
                  </span>
                </div>
              </div>

              {/* Color Selection */}
              {product.variants && product.variants.length > 0 && (
                <div className="flex">
                  <p className="font-medium mr-4">Pick a Color</p>
                  <div className="flex gap-3">
                    <button
                      className={`w-6 h-6 rounded-full ${
                        !selectedVariant
                          ? "ring-2 ring-blue-500 ring-offset-2"
                          : ""
                      }`}
                      style={{ backgroundColor: product.baseColor.colorHex }}
                      onClick={() => setSelectedVariant(null)}
                      // aria-label="Default Black"
                    />
                    {product.variants.map((variant) => (
                      <button
                        key={variant.variantId}
                        className={`w-6 h-6 rounded-full ${
                          selectedVariant?.variantId === variant.variantId
                            ? "ring-2 ring-blue-500 ring-offset-2"
                            : ""
                        }`}
                        style={{ backgroundColor: variant.colorHex }}
                        onClick={() => setSelectedVariant(variant)}
                        aria-label={variant.colorName}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              {/* Add to Cart */}
              {product?.showAddToCart && (
                <AddToCartButton
                  product={product}
                  selectedVariant={selectedVariant || undefined}
                />
              )}

              {/* Expandable Sections */}
              <div className="space-y-2">
                {sections.map(({ title, content }) => (
                  <div
                    key={title}
                    className="rounded font-inter font-medium text-base"
                  >
                    <button
                      className={`w-full px-4 py-3 text-left flex justify-between items-center border-b ${
                        expandedSection === title
                      }`}
                      onClick={() =>
                        setExpandedSection(
                          expandedSection === title ? null : title
                        )
                      }
                    >
                      <span className="font-medium">{title}</span>
                      {expandedSection === title ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    {expandedSection === title && (
                      <div className="px-4 py-3 text-gray-300">{content}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Stock Info */}
              {/* <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-md flex items-center gap-2">
                <span>⚠️</span>
                <span>Last 4 left</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={displayImages.map((img) => urlFor(img).quality(100).url())}
        currentImageIndex={currentImageIndex}
        onPrevious={handlePreviousImage}
        onNext={handleNextImage}
      />
{/* Similar Products */}
{product?.category && (
  <div className="max-w-[98%] mx-auto px-4">
    <SimilarProducts 
      currentProductId={product._id} 
      category={product.category} 
    />
  </div>
)}
      <Footer />
      <Tnc />
    </div>
  );
};

export default ProductDetails;
