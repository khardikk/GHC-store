import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { urlFor } from "../lib/client";
import Footer from "./Footer";
import Tnc from "./Tnc";
import { Product } from "../types/product";
import { Loader2, LockKeyhole } from "lucide-react";
import EmptyCart from "./EmptyCart";
import { useNavigate } from "react-router-dom";
import { secureRequest } from "../utils/auth";
import FullscreenLoader from "./FullscreenLoader";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, getTotalPrice, addToCart, clearCart } =
    useCart();
  const [localCartItems, setLocalCartItems] = useState(cartItems);
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false); // Add state for verifying loader
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const isAddressValid = address.trim().length >= 10; // Minimum length for valid address

  // Validation
  const isNameValid = /^[a-zA-Z\s'-]{2,50}$/.test(name.trim());
  const isPhoneValid = /^[6-9]\d{9}$/.test(phone);
  const isFormValid = isNameValid && isPhoneValid && isAddressValid;

  // Freebie product definition
  const freeProduct: Product = {
    _id: "2e53572e-eebf-441a-a5e8-5c3e40b1b710",
    title: "The Little Things",
    defaultPrice: {
      current: 0,
      original: 0,
    },
    quantity: 1,
    category: {
      title: "goodie-box",
      _ref: "goodie-box-ref",
    },
    baseSlug: {
      current: "the-little-things",
    },
    baseColor: {
      colorName: "Default",
      colorHex: "#000000",
    },
    image: {
      _type: "image",
      asset: {
        _ref: "image-cc0eab5be8ae574ca5887198fc21e9180525d606-1024x1024-png",
        _type: "reference",
      },
    },
    variants: [],
  };

  // Calculate non-free items
  const nonFreeItems = cartItems.filter((item) => item._id !== freeProduct._id);

 useEffect(() => {
  setLocalCartItems(cartItems);

  // Remove freebie if it's the only item
  if (nonFreeItems.length === 0 && isFreeItemInCart) {
    updateQuantity(freeProduct._id, undefined, 0);
  }
}, [cartItems]);

  const handleQuantityChange = (
    id: string,
    variantId: string | undefined,
    newQuantity: number,
    selectedSize?: string
  ) => {
    if (newQuantity > 0) {
      updateQuantity(id, variantId, newQuantity, selectedSize);
    } else {
      updateQuantity(id, variantId, 0, selectedSize);
    }
  };
  const handleAddFreebie = () => {
    addToCart(freeProduct);
  };

  const totalPrice = getTotalPrice();
  const savings = cartItems.reduce(
    (acc, item) =>
      acc +
      (item.defaultPrice.original - item.defaultPrice.current) * item.quantity,
    0
  );

  const isFreeItemInCart = cartItems.some(
    (item) => item._id === freeProduct._id
  );

  const handleCheckout = async () => {
    setError(null);
    try {
      setIsProcessing(true);

      const orderData = {
        amount: totalPrice - savings,
        customerName: name,
        customerPhone: phone,
        address: address,
        items: cartItems.map((item) => ({
          productId: item._id,
          title: item.title,
          quantity: item.quantity,
          price: {
            current: item.defaultPrice.current,
            original: item.defaultPrice.original,
          },
        })),
      };

      const { orderId, sanityOrderId } = await secureRequest(
        "/api/razorpay/create-order",
        orderData
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: Math.round((totalPrice - savings) * 100),
        currency: "INR",
        name: "GHC Store",
        description: "Purchase Payment",
        order_id: orderId,
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          await handlePaymentSuccess(response, sanityOrderId);
        },
        prefill: {
          name,
          contact: phone,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout failed:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Payment failed. Please try again."
      );
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = async (response: any, sanityOrderId: string) => {
    try {
      setIsVerifying(true); // Show verifying loader
      const { verified } = await secureRequest("/api/razorpay/verify-payment", {
        ...response,
        sanityOrderId,
      });

      if (verified) {
        clearCart();
        // Add small delay for better UX
        // await new Promise(resolve => setTimeout(resolve, 1000));
        navigate("/confirm", {
          state: {
            isPaymentSuccessful: true,
            orderDetails: {
              orderId: response.razorpay_payment_id,
              customerName: name,
            },
          },
          replace: true,
        });
      }
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      setIsVerifying(false); // Hide loader
    }
  };

  if (localCartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div>
      <div className="max-w-[98%] mx-auto px-4 py-8">
        <div className="font-inter flex  flex-col md:flex-row  gap-4 justify-between ">
          <div>
            <h1 className="text-lg font-medium">
              You're 🤏 this close to kickstarting those habits!
            </h1>
            <p className="text-sm text-gray-600  pb-4">
              Add your details and proceed to payment
            </p>
          </div>
          <div>
            <div id="checkout-form" className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`mt-1 block w-full p-2 border rounded-md ${
                    name &&
                    (isNameValid ? "border-green-500" : "border-red-500")
                  }`}
                  placeholder="Enter your name"
                  required
                />
                {name && !isNameValid && (
                  <p className="text-xs text-red-500 mt-1">Name is required</p>
                )}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Phone Number
                </label>
                <div className="flex items-center">
                  <span className="px-2 py-2 bg-gray-100 text-gray-700 rounded-l-md border border-gray-300  mt-1">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                      if (input.length <= 10) {
                        setPhone(input); // Only update with max 10 digits
                      }
                    }}
                    className={`block w-full p-2 border rounded-r-md mt-1 ${
                      phone &&
                      (isPhoneValid ? "border-green-500" : "border-red-500")
                    }`}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                {phone && !isPhoneValid && (
                  <p className="text-xs text-red-500 mt-1">
                    Enter a valid 10-digit phone number
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`mt-1 block w-full p-2 border rounded-md ${
                    address &&
                    (isAddressValid ? "border-green-500" : "border-red-500")
                  }`}
                  placeholder="Enter complete address with pincode"
                  rows={3}
                  required
                />
                {address && !isAddressValid && (
                  <p className="text-xs text-red-500 mt-1">
                    Please enter complete address with pincode
                  </p>
                )}
              </div>
              {/* Checkout Top */}
              <div className="md:flex md:mt-0 md:justify-center flex-col">
                <button
                  className={`w-full md:w-auto px-4 py-2 mt-2 md:mt-5 rounded-lg text-white ${
                    isFormValid
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={handleCheckout}
                  disabled={!isFormValid || isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={16} />
                      Processing...
                    </span>
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Freebie Button */}
       {nonFreeItems.length > 0 && !isFreeItemInCart && (
          <div className="mt-4 mb-4">
            <button
              onClick={handleAddFreebie}
              className="bg-buttonOrange text-white font-inter px-4 py-2 rounded-xl hover:text-black hover:border-buttonOrange hover:border hover:bg-white flex items-center gap-2 transition-all"
            >
              <span>
                <LockKeyhole />
              </span>
              UNLOCK FREE GIFT
            </button>
          </div>
        )}

        <div className="space-y-4 py-6">
          {localCartItems.map((item, index) => (
            <div
              key={`${item._id}_${index}`}
              className="flex items-center gap-4 border border-gray-200 rounded-lg p-6"
            >
              {item.image && item.image.asset && (
                <img
                  src={urlFor(item.image).url()}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="text-sm font-blueCashews">
                  {item.title}{" "}
                  {item.selectedSize ? `` : ""}
                </h3>
                <div className="text-xs font-inter mt-1 text-gray-500">
                  {item.defaultPrice.current === 0 ? (
                    <span className="text-gray-500">
                      from the team #GoodHabitClub
                    </span>
                  ) : (
                    <>
                      <span className="line-through">
                        ₹{item.defaultPrice.original}
                      </span>{" "}
                      ₹{item.defaultPrice.current}
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 border rounded-md">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      item._id,
                      item.selectedVariant?.variantId,
                      item.quantity - 1,
                      item.selectedSize
                    )
                  }
                  className="px-3 py-1 text-gray-500 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(
                      item._id,
                      item.selectedVariant?.variantId,
                      item.quantity + 1,
                      item.selectedSize
                    )
                  }
                  className="px-3 py-1 text-gray-500 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Forgot Something Section */}
        <div className="flex justify-between items-center p-6 border rounded-xl">
          <div>
            <h2 className=" text-sm  font-blueCashews">Forgot something?</h2>
            <p className="text-xs text-gray-500 max-w-40 md:max-w-full">
              Keep shopping, we've saved your cart for you.
            </p>
          </div>
          <button
            className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 font-inter font-medium"
            onClick={() => (window.location.href = "/")}
          >
            SHOP
          </button>
        </div>

        {/* Bill Details */}
        <div className="mt-6">
          <div className="mb-5">
            <h2 className="font-semibold font-inter text-base">Bill Details</h2>
            <span className="font-inter text-xs text-gray-500">
              We promise its gonna be worth every penny!
            </span>
          </div>
          <div className="space-y-4 text-sm font-inter border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <span>Item total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600 pt-3 border-t border-gray-200 font-medium">
              <span>Discount</span>
              <span>₹{savings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200 font-medium">
              <span>Shipping</span>
              <span className="font-semibold">FREE</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200 font-medium">
              <span>To Pay</span>
              <span>₹{(totalPrice - savings).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Tnc />
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      {isVerifying && <FullscreenLoader />}
    </div>
  );
};

export default Cart;
