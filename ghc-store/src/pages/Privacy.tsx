import React from 'react';
import Footer from '../components/Footer';
import Tnc from '../components/Tnc';

const Privacy: React.FC = () => {
  return (
    <div>
      <div className="min-h-full bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="border border-gray-200 rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-6 font-inter">Privacy Policy for General Habit Store by Good Habits Club</h1>
            
            <div className="space-y-6 font-inter text-sm leading-relaxed">
              <p className="mb-4">
                Effective Date: 1 Dec 2024
              </p>
              <p>
                At the Good Habits Club, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you interact with our store.
              </p>

              <section>
                <h2 className="font-bold mb-2">1. Information We Collect</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Personal Information</strong>: Name, email address, phone number, billing and shipping address.</li>
                  <li><strong>Payment Information</strong>: Credit/debit card details or UPI/payment gateway information (handled securely by third-party payment processors).</li>
                  <li><strong>Usage Information</strong>: Details about how you use our website, such as pages visited, items viewed, and purchase history.</li>
                  <li><strong>Device Information</strong>: IP address, browser type, and operating system.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-bold mb-2">2. How We Use Your Information</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Process and fulfill your orders, including shipping and payment.</li>
                  <li>Provide customer support and respond to inquiries.</li>
                  <li>Improve our website and customize your shopping experience.</li>
                  <li>Send updates about your orders and promotional materials (only with your consent).</li>
                  <li>Prevent fraudulent transactions and ensure the security of our platform.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-bold mb-2">3. Sharing Your Information</h2>
                <p>We do not sell or rent your personal information to third parties. However, we may share your information with:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Service Providers</strong>: For processing payments, shipping orders, or analyzing website performance.</li>
                  <li><strong>Legal Compliance</strong>: If required by law or to protect the rights and safety of GHC and its users.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-bold mb-2">4. Data Retention</h2>
                <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>
              </section>

              <section>
                <h2 className="font-bold mb-2">5. Security Measures</h2>
                <p>We take appropriate technical and organizational measures to protect your personal information from unauthorized access, use, or disclosure. This includes encrypted transactions and secure data storage.</p>
              </section>

              <section>
                <h2 className="font-bold mb-2">6. Your Rights</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Access the personal information we have about you.</li>
                  <li>Request corrections or updates to your information.</li>
                  <li>Opt out of receiving promotional communications.</li>
                  <li>Request deletion of your data (subject to legal or operational constraints).</li>
                </ul>
              </section>

              <section>
                <h2 className="font-bold mb-2">7. Cookies and Tracking</h2>
                <p>We use cookies to enhance your browsing experience. These cookies collect data about your interactions with our website, helping us improve functionality and user experience. You can manage your cookie preferences through your browser settings.</p>
              </section>

              <section>
                <h2 className="font-bold mb-2">8. Third-Party Links</h2>
                <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.</p>
              </section>

              <section>
                <h2 className="font-bold mb-2">9. Updates to This Policy</h2>
                <p>We may update this Privacy Policy to reflect changes in our practices or for legal reasons. We encourage you to review this page periodically.</p>
              </section>

              <section>
                <h2 className="font-bold mb-2">10. Contact Us</h2>
                <p>
                If you have any questions or concerns, please reach out to us at
                </p>
                <ul className="list-disc pl-5">
                  <li><strong>Email</strong>: <a href="mailto:goodhabitsclub.org@gmail.com" className="text-blue-600 hover:underline">goodhabitsclub.org@gmail.com</a></li>
                </ul>
              </section>

              <p className="mt-6">
                Thank you for trusting the Good Habits Club Store. Your privacy and security are our priorities!
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

export default Privacy;
