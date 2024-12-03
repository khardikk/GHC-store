import React, { useEffect, useState, ReactNode } from 'react';

interface LogoLoaderProps {
  children: ReactNode;
}

const LogoLoader: React.FC<LogoLoaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 0.5 second delay before sliding up

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      {/* Main content */}
      <div className="w-full">
        {children}
      </div>

      {/* Logo overlay that slides up */}
      <div 
        className={`fixed top-0 left-0 w-full h-screen bg-white flex items-center justify-center transform transition-transform duration-1000 ease-in-out ${
          isLoading ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="w-40 h-40 relative">
          <img src="./logoLoader.svg" alt="Logo" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default LogoLoader;