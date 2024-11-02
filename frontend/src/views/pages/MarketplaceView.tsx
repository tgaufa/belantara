// frontend/src/views/pages/MarketplaceView.tsx
import React from 'react';
import { MapView } from '../components/map/MapView';

export const MarketplaceView: React.FC = () => {
  return (
    <div className="h-screen w-screen relative">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 h-16 bg-white/95 shadow-sm z-20 px-6 flex items-center">
        <h1 className="text-xl font-semibold text-gray-700">🌾 Belantara</h1>
      </header>

      {/* Main Map */}
      <div className="w-full h-full">
        <MapView />
      </div>
    </div>
  );
};