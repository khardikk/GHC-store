import React from 'react';
import GridLines from 'react-gridlines';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-mainBg">
      <Navbar />
      <main className="flex-1 relative">
        <GridLines
          lineColor="rgba(0, 0, 0, 0.1)"
          lineWidth={0.5}
          cellWidth={20}
          cellHeight={20}
          className="absolute inset-0"
        >
          <div className="relative">
            <MainContent />
          </div>
        </GridLines>
      </main>
    </div>
  );
};

export default App;

