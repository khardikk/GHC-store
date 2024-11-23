import React from 'react';
import GridLines from 'react-gridlines';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import './App.css'

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-mainBg">
      <Navbar />
      <GridLines
          lineColor="rgba(0, 0, 0, 0.1)"
          cellWidth={20}
          cellHeight={20}
        >
      <main className="flex-1 relative">
     
          <div className="relative">
            <MainContent />
          </div>
      </main>
        </GridLines>
    </div>
  );
};

export default App;

