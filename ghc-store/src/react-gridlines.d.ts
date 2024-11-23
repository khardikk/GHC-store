declare module 'react-gridlines' {
  import React from 'react';

  export interface GridlineProps {
    className?: string;
    style?: React.CSSProperties;
    lineColor?: string;
    lineWidth?: number;
    cellWidth?: number;
    cellHeight?: number;
    orientation?: 'horizontal' | 'vertical' | 'both';
    snapToGrid?: boolean;
    children?: React.ReactNode; // Add this line to allow children
  }

  const GridLines: React.FC<GridlineProps>;

  export default GridLines;
}
