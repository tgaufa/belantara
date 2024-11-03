// src/views/components/search/SearchBar.tsx
import React from 'react';
import { Search } from 'lucide-react';

interface SearchSectionProps {
  label: string;
  placeholder: string;
  onClick: () => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ label, placeholder, onClick }) => (
  <button 
    onClick={onClick}
    className="flex-1 text-left px-6 h-full flex flex-col justify-center hover:bg-gray-50 transition-colors"
  >
    <span className="text-sm font-medium text-gray-900">{label}</span>
    <span className="text-sm text-gray-500">{placeholder}</span>
  </button>
);

export const SearchBar: React.FC = () => {
  const handleSearch = () => {
    console.log('Search clicked');
  };

  return (
    <div className="bg-white rounded-full shadow-md flex items-center h-16">
      <SearchSection 
        label="Location" 
        placeholder="Search area..."
        onClick={() => console.log('Location clicked')}
      />
      
      <div className="w-px h-8 bg-gray-200" />
      
      <SearchSection 
        label="Product" 
        placeholder="Select commodity"
        onClick={() => console.log('Product clicked')}
      />
      
      <div className="w-px h-8 bg-gray-200" />
      
      <SearchSection 
        label="Availability" 
        placeholder="Add dates"
        onClick={() => console.log('Availability clicked')}
      />
      
      <div className="w-px h-8 bg-gray-200" />
      
      <SearchSection 
        label="Quantity" 
        placeholder="Add tonnage"
        onClick={() => console.log('Quantity clicked')}
      />

      <button 
        onClick={handleSearch}
        className="p-4 mx-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center justify-center"
        aria-label="Search"
      >
        <Search size={20} />
      </button>
    </div>
  );
};