import { Navigate, useLocation } from 'react-router-dom';
import Tnc from './Tnc';
import Footer from './Footer';

interface LocationState {
  isPaymentSuccessful?: boolean;
  orderDetails?: {
    orderId: string;
    customerName: string;
  };
}

const OrderConfirmation = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  // Redirect if accessed directly without payment
  if (!state?.isPaymentSuccessful) {
    return <Navigate to="/" replace />;
  }


  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex min-h-[80vh] items-center justify-center flex-1 p-4">
        <div className="max-w-6xl w-full flex flex-col md:flex-row justify-center items-center gap-8 bg-white rounded-lg">
          <div className="w-1/2 flex items-center">
            <img src="/orderconfirm.svg" alt="GHC Mascot" className="w-full max-w-md mx-auto" />
          </div>
          
          <div className="md:w-1/2 w-full text-center md:text-left">
            <h1 className="text-2xl font-medium mb-2">
              Thank you for choosing us, {state.orderDetails?.customerName} 💛
            </h1>
            <p className="text-gray-600 mb-4">You've got great taste ;)</p>
            
            <p className="text-sm text-gray-500 mb-6 font-inter">
              We're thrilled you've decided to level up your habit game with the GHC goodies. 
              We'll be reaching out soon to say hello and share updates on your order. 
              Please bear with us for a bit—it's a small crew of good folk here, building something meaningful 
              with love and care.
            </p>
            
            <div className="text-sm text-gray-500 mb-6 font-inter">
              How about you flex your choices by sharing a screenshot of your order 
              with #JustHabitIn on your socials and tell us how excited you are! We 
              can't wait to have you as part of our good habits journey.
            </div>
            
            <p className="text-sm font-medium text-gray-600">
              ORDER ID: {state.orderDetails?.orderId}
            </p>
            <p className="text-sm font-medium mt-4">Let's make good habits happen, together! ✨</p>
            
            <button
              onClick={() => window.location.href = '/'}
              className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <Tnc />
    </div>
  );
 };
export default OrderConfirmation;