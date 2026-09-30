import React from 'react';
import { Desktop } from './components/Desktop';
import { PortfolioProvider } from './context/PortfolioContext';

export default function App() {
  return (
    <PortfolioProvider>
      <Desktop />
    </PortfolioProvider>
  );
}


