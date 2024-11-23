import React, { useState } from 'react';
import footerImg from '/footer.png';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isProfitsExpanded, setIsProfitsExpanded] = useState(false);

  return (
    <div className="flex justify-center p-4 w-full h-full font-inter">
      {/* Outer container for controlling width */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-4/5">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-inter font-bold mb-2">Let's get this Habit Party started!</h1>
            <p className="text-gray-600 mb-4">Good habits, bad*ss vibes.</p>
          </div>
          <div className="w-24 h-24">
            <div className="rounded-full w-full h-full flex items-center justify-center text-white text-4xl">
              <img src={footerImg} alt="Footer Icon" />
            </div>
          </div>
        </div>

        {/* Join Button */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-md mb-4 hover:bg-blue-700 transition-colors">
          Join the Club
        </button>

        {/* About Section */}
        <div className="mb-4">
          <button
            className="flex justify-between items-center w-full text-left"
            onClick={() => setIsAboutExpanded(!isAboutExpanded)}
          >
            <span className="font-semibold">What's so cool about us?</span>
            {isAboutExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
          {isAboutExpanded && (
            <div className="mt-2 text-sm">
              <ul className="list-disc pl-5 space-y-2">
                <li>We're a solid community of people with strong intent, started to bring together those of us building good habits and wanting to stick to them—whether in fitness, healthy eating, productivity, reading, or anything else that fuels good vibes!</li>
                <li>What sets us apart is the personal touch. We're always up for a conversation if you want to know more!</li>
                <li>From tools to track your progress to a squad that cheers you on, we're here to help you crush your goals, one good habit at a time!</li>
              </ul>
            </div>
          )}
        </div>

        {/* Profits Section */}
        <div className="mb-4">
          <button
            className="flex justify-between items-center w-full text-left"
            onClick={() => setIsProfitsExpanded(!isProfitsExpanded)}
          >
            <span className="font-semibold">Are we making profits?</span>
            {isProfitsExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
          {isProfitsExpanded && (
            <div className="mt-2 text-sm">
              <ul className="list-disc pl-5 space-y-2">
                <li>Every little amount we earn from this habit store goes right back into building something bigger for the community.</li>
                <li>This isn't a business — it's a passion project that fuels our drive to do more, create more, and grow together.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Share Section */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Got something to share?</h3>
          <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
            Whatsapp Us
          </button>
        </div>

        {/* Social Links */}
        <div className="text-center text-sm text-gray-600">
          <a href="#" className="hover:underline">Twitter</a> | <a href="#" className="hover:underline">Instagram</a> | <a href="#" className="hover:underline">Strava</a> | <a href="#" className="hover:underline">Volunteer</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
