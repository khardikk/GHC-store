import React from 'react';
import Footer from '../components/Footer';
import Tnc from '../components/Tnc';

const Return: React.FC = () => {
  return (
    <div>
      <div className="min-h-full bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="border border-gray-200 rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-6 font-inter">Returns and Refunds</h1>

            <div className="space-y-6 font-inter text-sm leading-relaxed">
              <p className="mb-4">
                At the Good Habits Club Store, we prioritize the quality of our products and your satisfaction. Please read our returns and refunds policy carefully:
              </p>

              <section>
                <h2 className="font-bold mb-2">1. No Returns</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>We do not accept returns once the product has been delivered.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-bold mb-2">2. Refunds</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Refunds are only applicable if the product is found to be defective or damaged during transit.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-bold mb-2">3. Non-Refundable Items</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Personalized or digital items are non-refundable under any circumstances.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-bold mb-2">4. How to Request a Refund (for Defective or Damaged Items)</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Email us at <a href="mailto:goodhabitsclub.org@gmail.com" className="text-blue-600 hover:underline">goodhabitsclub.org@gmail.com</a> within <b>48 hours of delivery</b> with:</li>
                  <ul className="list-disc pl-8 space-y-2">
                    <li>Your order number.</li>
                    <li>Clear photos of the defective/damaged product and packaging.</li>
                  </ul>
                  <li>Once we review and verify the issue, we will process your refund within <b>7-10 business days</b> to the original payment method.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-bold mb-2">Contact Us</h2>
                <p>
                  If you have any questions or concerns, please reach out to us at <a href="mailto:goodhabitsclub.org@gmail.com" className="text-blue-600 hover:underline">goodhabitsclub.org@gmail.com</a> or call us at <b>+91 9019009852</b>.
                </p>
              </section>

              <p className="mt-6">
                We appreciate your understanding and support of this policy. 😊
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Tnc />
    </div>
  );
};

export default Return;
