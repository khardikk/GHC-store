import React, { useEffect, useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface LogoLoaderProps {
  children: ReactNode;
  initialDuration?: number;
}

const LogoLoader: React.FC<LogoLoaderProps> = ({ children, initialDuration = 4000 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const isFirstVisit = !localStorage.getItem('hasVisited');
    const loadingTime = isFirstVisit ? initialDuration : 2000;

    const timer = setTimeout(() => {
      setIsLoading(false);
      if (isFirstVisit) {
        localStorage.setItem('hasVisited', 'true');
      }
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [initialDuration, location.pathname]);

  return (
    <div className="relative min-h-screen w-full">
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>

      <div
        className={`fixed inset-0 z-50 bg-white flex items-center justify-center transform transition-transform duration-1000 ease-in-out ${
          isLoading ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="w-[300px] h-[300px] relative">
          <img src="./logoLoader.svg" alt="Logo" className="w-[300px] h-[300px] animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default LogoLoader;