import React from 'react';

interface FilterTabsProps {
  filters: string[];
  selected: string;
  onSelect: (filter: string) => void;
  className?: string;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ filters, selected, onSelect, className = '' }) => (
  <div className={`flex space-x-8 border-b border-gray-200 flex-1 ${className}`}>
    {filters.map((filter) => (
      <button
        key={filter}
        className={`pb-2 text-base font-medium focus:outline-primary-200 transition-colors duration-200
          ${selected === filter
            ? 'text-primary-600 border-b-2 border-primary-600'
            : 'text-gray-500 border-b-2 border-transparent hover:text-primary-600'}
        `}
        onClick={() => onSelect(filter)}
        style={{ background: 'none', boxShadow: 'none' }}
        type="button"
      >
        {filter}
      </button>
    ))}
  </div>
);

export default FilterTabs; 