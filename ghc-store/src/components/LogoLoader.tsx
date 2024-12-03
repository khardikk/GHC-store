import React, { useEffect, useState, ReactNode } from 'react';

interface LogoLoaderProps {
  children: ReactNode;
}

const LogoLoader: React.FC<LogoLoaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isFirstVisit = !localStorage.getItem('hasVisited');
    const loadingTime = isFirstVisit ? 2000 : 1500; // Adjust timing for first and subsequent visits

    const timer = setTimeout(() => {
      setIsLoading(false);
      if (isFirstVisit) {
        localStorage.setItem('hasVisited', 'true');
      }
    }, loadingTime);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      {/* Main content */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>

      {/* Fullscreen Logo overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white flex items-center justify-center transform transition-transform duration-1000 ease-in-out ${
          isLoading ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="w-40 h-40 relative">
          <img src="./logoLoader.svg" alt="Logo" className="w-[300px] h-[300px] animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default LogoLoader;
