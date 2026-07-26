import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const FilterBar = ({ 
  searchQuery, 
  setSearchQuery, 
  sortOption, 
  setSortOption,
  totalItems 
}) => {
  return (
    <div className="bg-white p-4 rounded-none border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search Input */}
      <div className="relative w-full md:max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:outline-none focus:border-primary focus:bg-white transition-colors text-sm"
        />
      </div>

      {/* Sort and Info */}
      <div className="flex items-center justify-between w-full md:w-auto gap-6">
        <div className="text-sm text-gray-500 font-medium hidden md:block">
          Showing {totalItems} {totalItems === 1 ? 'result' : 'results'}
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <SlidersHorizontal size={18} className="text-gray-400 hidden sm:block" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full md:w-auto py-3 px-4 bg-gray-50 border border-gray-200 rounded-none focus:outline-none focus:border-primary text-sm font-medium cursor-pointer appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1em 1em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="default">Sort by: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
