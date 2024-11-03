// frontend/src/views/pages/MarketplaceView.tsx
import React from 'react';
import { MapView } from '../components/map/MapView';
import { SearchBar } from '../components/search/SearchBar';


export const MarketplaceView: React.FC = () => {
  return (
    <div className="h-screen w-screen relative">
      {/* Floating Header */}
      <div className="absolute top-4 left-4 z-50">
        <div className="bg-white/95 px-4 py-2 rounded-lg shadow-md backdrop-blur-sm">
          <h1 className="text-xl font-semibold text-gray-700">🌾 Belantara</h1>
        </div>
      </div>

      {/* Main Map */}
      <div className="absolute inset-0 z-0">
        <MapView />
      </div>

      {/* Floating Search Bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-6 z-40">
        <SearchBar />
      </div>

    </div>
  );
};