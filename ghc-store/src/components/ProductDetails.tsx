import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client, urlFor } from "../lib/client";
import { Product } from "../types/product";
import ContentLoader from "../components/ContentLoader";
import Tnc from "./Tnc";
import Footer from "./Footer";
import AddToCartButton from "./AddToCartButton";
import { ChevronDown, ChevronUp } from 'lucide-react';
import "./ProductDetail.css"

const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<{
    colorName: string;
    variantImages: any[];
  } | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const productData = await client.fetch<Product>(
          `*[_type == "product" && slug.current == $slug][0]{
            _id,
            title,
            slug,
            image,
            additionalImages,
            originalPrice,
            currentPrice,
            showAddToCart,
            category->{
              title
            },
            variants[] {
              colorName,
              colorHex,
              variantImages
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
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>I'm a software engineer by profession, having worked at...</li>
          <li>A couple of startups, anything code-related is something that I can pick up.</li>
          <li>I'm super into planning for events and organizing them.</li>
        </ul>
      ),
    },
    {
      title: "Shipping",
      content: <p className="text-gray-600">Free shipping for orders over ₹500.</p>,
    },
    {
      title: "Return Policy",
      content: <p className="text-gray-600">7-day return policy on unused items.</p>,
    },
  ];

  const handleVariantSelection = (variant: { colorName: string; variantImages: any[] }) => {
    setSelectedVariant(variant);
  };

  const displayTitle = selectedVariant
    ? `${product.title} - ${selectedVariant.colorName}`
    : product.title;

  // Get images to display based on selection and availability
  const getDisplayImages = () => {
    if (selectedVariant?.variantImages?.length) {
      return selectedVariant.variantImages;
    }
    if (product.additionalImages?.length) {
      return product.additionalImages;
    }
    // If no variant images or additional images, create an array with the default image
    return product.image ? Array(2).fill(product.image) : [];
  };

  const displayImages = getDisplayImages();

  return (
    <div>
      <div className="max-w-[98%] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side: Image Grid */}
          <div className="md:w-2/3">
            <div className="grid grid-cols-2 gap-4">
              {displayImages.slice(0, 6).map((img, index) => (
                <div key={index} className="overflow-hidden">
                  <img
                    src={urlFor(img).quality(100).url()}
                    alt={`Product Image ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Product Details */}
          <div className="product-details md:w-1/3 max-h-full md:max-h-screen overflow-y-scroll sticky top-10">
            <div className="border rounded-xl p-6 space-y-6">
              <div>
                <h1 className="text-2xl font-medium mb-2">{displayTitle}</h1>
                <div className="flex items-center gap-2">
                  <span className="line-through text-gray-500">₹{product.originalPrice}</span>
                  <span className="text-xl font-semibold">₹{product.currentPrice}</span>
                </div>
              </div>

              {/* Color Selection */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <p className="font-medium mb-2">Pick a Color</p>
                  <div className="flex gap-3">
                    <button
                      className={`w-6 h-6 rounded-full ${
                        !selectedVariant ? "ring-2 ring-blue-500 ring-offset-2" : ""
                      }`}
                      style={{ backgroundColor: "#000000" }}
                      onClick={() => setSelectedVariant(null)}
                      aria-label="Default Black"
                    />
                    {product.variants.map((variant, index) => (
                      <button
                        key={index}
                        className={`w-6 h-6 rounded-full ${
                          selectedVariant?.colorName === variant.colorName
                            ? "ring-2 ring-blue-500 ring-offset-2"
                            : ""
                        }`}
                        style={{ backgroundColor: variant.colorHex }}
                        onClick={() => handleVariantSelection(variant)}
                        aria-label={variant.colorName}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              {product.showAddToCart && <AddToCartButton product={product} />}

              {/* Expandable Sections */}
              <div className="space-y-2">
                {sections.map(({ title, content }) => (
                  <div key={title} className="border rounded">
                    <button
                      className={`w-full px-4 py-3 text-left flex justify-between items-center ${
                        expandedSection === title
                          ? "bg-gray-100"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setExpandedSection(expandedSection === title ? null : title)}
                    >
                      <span className="font-medium">{title}</span>
                      {expandedSection === title ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    {expandedSection === title && (
                      <div className="px-4 py-3 border-t">{content}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Stock Info */}
              <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-md flex items-center gap-2">
                <span>⚠️</span>
                <span>Last 4 left</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Tnc />
    </div>
  );
};

export default ProductDetails;