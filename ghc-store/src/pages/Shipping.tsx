import React from 'react';
import Footer from '../components/Footer';
import Tnc from '../components/Tnc';

const Shipping: React.FC = () => {
  return (
    <div>
      <div className="min-h-full bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="border border-gray-200 rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-6 font-inter">Shipping and Delivery</h1>
            <div className="space-y-6 font-inter text-sm leading-relaxed">
              <p className="mb-4">
                At the Good Habits Club Store, we aim to deliver your orders quickly and efficiently. Here’s how our shipping process works:
              </p>

              <section>
                <h2 className="font-bold mb-2">Processing Time</h2>
                <p>Orders are processed within <strong>3-5 business days</strong> after payment confirmation. Personalized or custom items may require additional processing time.</p>
              </section>

              <section>
                <h2 className="font-bold mb-2">Shipping Time</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Metro Cities</strong>: 5-7 business days.</li>
                  <li><strong>Non-Metro and Remote Areas</strong>: 7-10 business days.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-bold mb-2">Shipping Charges</h2>
                <p>Shipping costs are calculated at checkout based on your delivery address and order size.</p>
              </section>

              <section>
                <h2 className="font-bold mb-2">Tracking</h2>
                <p>Once your order is shipped, you will receive a tracking number via email or SMS to monitor your delivery status.</p>
              </section>

              <section>
                <h2 className="font-bold mb-2">Delivery Issues</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    If your package is delayed or damaged in transit, please contact us immediately at <a href="mailto:goodhabitsclub.org@gmail.com" className="text-blue-600 hover:underline">goodhabitsclub.org@gmail.com</a> or call us at <strong>+91 9019009852</strong>.
                  </li>
                  <li>
                    We are not responsible for delays caused by the courier or external factors such as weather or strikes.
                  </li>
                </ul>
              </section>

              <p className="mt-6">
                We strive to ensure your package reaches you safely and on time. If you have any questions about shipping, feel free to get in touch. 😊
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

export default Shipping;
