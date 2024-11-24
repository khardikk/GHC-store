import React from 'react';

const ContentLoader: React.FC = () => {
  return (
    <div className="animate-pulse px-6 py-8">
      {[1, 2].map((categoryIndex) => (
        <div key={categoryIndex} className="mb-12">
          <div className="mb-8">
            <div className="h-9 w-64 bg-gray-300 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((productIndex) => (
              <div key={productIndex} className="flex flex-col w-full max-w-[280px]">
                <div className="bg-white p-6 rounded-2xl mb-4">
                  <div className="bg-gray-300 w-full h-[200px]"></div>
                </div>
                <div className="h-6 bg-gray-300 w-3/4 mx-auto mb-2 rounded"></div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="h-5 w-16 bg-gray-300 rounded"></div>
                  <div className="h-5 w-16 bg-gray-300 rounded"></div>
                </div>
                <div className="h-[42px] bg-gray-300 rounded-full"></div>
              </div>
            ))}
          </div>
          <hr className="mt-6 border-t border-gray-800 w-full" />
        </div>
      ))}
    </div>
  );
};

export default ContentLoader;

