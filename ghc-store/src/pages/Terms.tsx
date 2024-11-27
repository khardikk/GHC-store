import React from 'react';
import Footer from '../components/Footer';
import Tnc from '../components/Tnc';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border border-gray-200 rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6 font-inter">Terms and Conditions</h1>
          
          <div className="space-y-6 font-inter text-sm leading-relaxed">
            <p className="mb-4">
              Welcome to the General Store by Good Habits Club! By accessing or making a purchase from our store, you agree to comply with the following terms and conditions:
            </p>

            <section>
              <h2 className="font-bold mb-2">1. General Use</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>These terms apply to all users of the site, including browsers, customers, and contributors of content.</li>
                <li>By using the GHC Store, you confirm that you are at least 18 years of age or have the consent of a guardian to make purchases.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold mb-2">2. Products and Pricing</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>All products displayed are subject to availability and may be withdrawn at any time.</li>
                <li>Prices are listed in INR and are subject to change without notice.</li>
                <li>We strive for accuracy, but errors in product descriptions, images, or pricing may occur, and we reserve the right to correct them.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold mb-2">3. Payment</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>We accept major credit cards, debit cards, and UPI payments.</li>
                <li>Payments must be made in full at checkout to confirm the order.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold mb-2">4. Shipping and Delivery</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Orders are processed within 3-5 business days. Shipping times may vary based on your location.</li>
                <li>Shipping charges will be displayed at checkout.</li>
                <li>We are not responsible for delays caused by the courier or external factors.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold mb-2">5. Returns and Refunds</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>We do not accept returns once the product has been delivered.</li>
                <li>Refunds are not applicable unless the product is found to be defective or damaged during transit.</li>
                <li>Personalized or digital items are non-refundable under any circumstances.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold mb-2">6. Privacy and Data</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>By shopping with us, you consent to the collection and use of your personal information in accordance with our Privacy Policy.</li>
                <li>We do not share your data with third parties without your consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold mb-2">7. Liability</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>The GHC Store is not liable for damage or loss caused by misuse of the products purchased.</li>
                <li>We are not responsible for delays or issues caused by events beyond our control, such as shipping delays or natural disasters.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold mb-2">8. Changes to Terms</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>We reserve the right to modify these Terms and Conditions at any time. Continued use of the site signifies your acceptance of the updated terms.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold mb-2">Contact Us</h2>
              <p>If you have any questions or concerns, please reach out to us at <a href="mailto:goodhabitsclub.org@gmail.com" className="text-blue-600 hover:underline">goodhabitsclub.org@gmail.com</a></p>
            </section>

            <p className="mt-6">
              Thank you for shopping with us and being part of the Good Habits Club! 😊
            </p>
          </div>
        </div>
      </div>
      <Footer/>
      <Tnc/>
    </div>
  );
};

export default Terms;

