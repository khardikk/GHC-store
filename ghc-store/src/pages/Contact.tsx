import React from 'react';
import Footer from '../components/Footer';
import Tnc from '../components/Tnc';
const Contact: React.FC = () => {
  return (
    <div>
      <div className="min-h-full bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="border border-gray-200 rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-6 font-inter">Contact Us</h1>
            <p className="text-sm mb-4 font-inter leading-relaxed">
              We’re here to help! If you have any questions, concerns, or feedback, please feel free to reach out to us:
            </p>
            <ul className="space-y-4 text-sm font-inter">
              <li>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:goodhabitsclub.org@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  goodhabitsclub.org@gmail.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong> <a href="tel:+919019009852" className="text-blue-600 hover:underline">+91 9019009852</a>
              </li>
              <li>
                <strong>Operation Address:</strong> 201, House Peru, Sector 2, HSR Layout, Bengaluru, Karnataka – 560102
              </li>
            </ul>
            <p className="text-sm mt-6">
              We’ll get back to you as soon as possible. Thank you for being a part of the Good Habits Club!
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <Tnc />
    </div>
  );
};

export default Contact;
