import React from 'react';

interface CuisineTypesSectionProps {
  selectedCuisineTypes: string[];
  onCuisineTypeChange: (cuisine: string, checked: boolean) => void;
  disabled?: boolean;
}

const cuisineOptions = [
  'Italian',
  'Chinese',
  'Nigerian',
  'Continental',
  'Indian',
  'Mexican',
  'Japanese',
  'Thai',
  'French',
  'Mediterranean',
  'American',
  'African',
  'Korean',
  'Lebanese',
  'Turkish',
];

const CuisineTypesSection: React.FC<CuisineTypesSectionProps> = ({
  selectedCuisineTypes,
  onCuisineTypeChange,
  disabled = false,
}) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2'>
        Cuisine Types
      </h3>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
        {cuisineOptions.map((cuisine) => (
          <label
            key={cuisine}
            className='flex items-center gap-2 cursor-pointer'
          >
            <input
              type='checkbox'
              checked={selectedCuisineTypes.includes(cuisine)}
              onChange={(e) => onCuisineTypeChange(cuisine, e.target.checked)}
              className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
              disabled={disabled}
            />
            <span className='text-sm text-gray-700'>{cuisine}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CuisineTypesSection;
