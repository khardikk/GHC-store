import React, { useState } from "react";
import footerImg from "/footer.svg";
import { ChevronDown, ChevronUp } from "lucide-react";

const Footer: React.FC = () => {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isProfitsExpanded, setIsProfitsExpanded] = useState(false);

  return (
    <div className="flex justify-center p-4 w-full h-full font-inter">
      {/* Outer container for controlling width */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6 w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center lg:items-start">
  {/* Text Section */}
  <div className="lg:w-3/4 lg:h-[15rem] h-full">
    <h1 className="text-xl lg:text-4xl font-inter font-semibold mb-4 leading-tight">
      Let's get this <br />
      Habit Party started!
    </h1>

  </div>

  {/* Image Section */}
  <div className="w-24 h-24 lg:w-[209px] lg:h-[208px] flex-shrink-0">
    <img src={footerImg} alt="Footer Icon" className="w-full h-full" />
  </div>
</div>

        {/* Join Button */}
        {/* <p className="text-gray-600 mb-4">Good habits, bad*ss vibes.</p> */}
       <a href="https://forms.gle/kpyULU7s5XnXrUkg6" target="_blank"> <button className="w-full bg-blue-600 text-white py-3 rounded-md mb-4 hover:bg-blue-700 transition-colors">
          Join the Club
        </button>
        </a>

        {/* About Section */}
        <div className="mb-4 font-inter border-b">
          <button
            className="flex justify-between items-center w-full text-left"
            onClick={() => setIsAboutExpanded(!isAboutExpanded)}
          >
            <span className="font-medium mb-4">What's so cool about us?</span>
            {isAboutExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
          {isAboutExpanded && (
            <div className="mt-2 text-sm">
              <ul className="list-disc pl-5 space-y-2 p-2 font-inter text-gray-600 mb-4">
                <li>
                  We're a solid community of people with strong intent, started
                  to bring together those of us building good habits and wanting
                  to stick to them—whether in fitness, healthy eating,
                  productivity, reading, or anything else that fuels good vibes!
                </li>
                <li>
                  What sets us apart is the personal touch. We're always up for
                  a conversation if you want to know more!
                </li>
                <li>
                  From tools to track your progress to a squad that cheers you
                  on, we're here to help you crush your goals, one good habit at
                  a time!
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Profits Section */}
        <div className="mb-4 font-inter border-b">
          <button
            className="flex justify-between items-center w-full text-left"
            onClick={() => setIsProfitsExpanded(!isProfitsExpanded)}
          >
            <span className="font-medium mb-4">Are we making profits?</span>
            {isProfitsExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
          {isProfitsExpanded && (
            <div className="mt-2 text-sm">
              <ul className="list-disc pl-5 space-y-2 text-gray-600 p-2 mb-4">
                <li>
                  Every little amount we earn from this habit store goes right
                  back into building something bigger for the community.
                </li>
                <li>
                  This isn't a business — it's a passion project that fuels our
                  drive to do more, create more, and grow together.
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Share Section */}
         <div className="mb-4">
          <h3 className="font-medium mb-4">Got something to share?</h3>
          <div className='flex'>
          <a href="https://wa.me/9019009852" target="_blank" className="w-4/5 bg-blue-600 text-white py-3 mr-2 rounded-md text-center hover:bg-blue-700 transition-colors">
          <button>
           Whatsapp Us
          </button>
          </a>
          <a href="mailto:goodhabitsclub.org@gmail.com" target="_blank" className="w-4/5 bg-blue-600 text-white py-3 mr-2 rounded-md text-center hover:bg-blue-700 transition-colors"> 
          <button >
         Drop a Mail
          </button>
          </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center text-sm text-gray-600">
          <a href="https://twitter.com/goodhabitsclub" target="_blank" className="hover:underline">
            Twitter
          </a>{" "}
          |{" "}
          <a href="https://instagram.com/club.goodhabits/" target="_blank" className="hover:underline">
            Instagram
          </a>{" "}
          |{" "}
          <a href="https://www.strava.com/clubs/goodhabitsclub" target="_blank" className="hover:underline">
            Strava
          </a>{" "}
          |{" "}
          <a href="https://varunperu.notion.site/1460f654848e80528a54d8a23fc71636?pvs=105" target="_blank" className="hover:underline">
            Volunteer
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
