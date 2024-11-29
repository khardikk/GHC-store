import React, { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
interface ExpandableSectionsProps {
  stockInfo?: string;
}

const ExpandableSections: React.FC<ExpandableSectionsProps> = ({ stockInfo }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections = [
    {
      title: "Product Details",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>I’m a software engineer by profession, having worked at...</li>
          <li>A couple of startups, anything code-related is something I can pick up.</li>
          <li>I’m super into planning for events and organizing them.</li>
        </ul>
      ),
    },
    {
      title: "Shipping",
      content: <p>Free shipping for orders over ₹500.</p>,
    },
    {
      title: "Return Policy",
      content: <p>7-day return policy on unused items.</p>,
    },
  ];

  return (
    <div>
      {/* Expandable Sections */}
      <div className="space-y-2">
        {sections.map(({ title, content }) => (
          <div key={title} className="border rounded">
            <button
              className={`w-full px-4 py-3 text-left flex justify-between items-center font-medium ${
                expandedSection === title
                  ? "bg-gray-100 text-black"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() =>
                setExpandedSection(expandedSection === title ? null : title)
              }
            >
              {title}
              {expandedSection === title ? (
                <ChevronUp className="h-5 w-5 text-gray-700" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-700" />
              )}
            </button>
            {expandedSection === title && (
              <div className="px-4 py-3 text-sm border-t">{content}</div>
            )}
          </div>
        ))}
      </div>

      {/* Stock Information */}
      {stockInfo && (
        <div className="mt-6 text-orange-500 bg-orange-100 px-4 py-2 rounded-md flex items-center gap-2">
          <span>⚠️</span>
          <span>{stockInfo}</span>
        </div>
      )}
    </div>
  );
};

export default ExpandableSections;