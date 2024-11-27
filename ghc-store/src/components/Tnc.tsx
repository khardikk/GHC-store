import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const Tnc: React.FC = () => {
  const legalLinks = [
    { title: 'Terms & Conditions', to: '/terms' },
    { title: 'Privacy Policy', to: '/terms' },
    { title: 'Contact Us', to: '/terms' },
    { title: 'Shipping & Delivery', to: '/terms' },
    { title: 'Returns & Refund Policy', to: '/terms' },
  ];

  return (
    <div className="w-full px-4 py-8 ">
      <div className="mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full">
          {legalLinks.map((link, index) => (
            <Link
              key={link.title}
              to={link.to}
              className={`flex items-center justify-between py-4 hover:opacity-70 transition-opacity ${
                index !== legalLinks.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="font-medium text-base">{link.title}</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tnc;
