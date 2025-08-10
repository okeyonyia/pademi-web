import React, { useState } from 'react';

interface CuisineTypesSectionProps {
  selectedCuisineTypes: string[];
  onCuisineTypeChange: (cuisine: string, checked: boolean) => void;
  disabled?: boolean;
}

// Top 15 cuisine types from restaurants.data.json
const cuisineOptions = [
  'Nigerian',
  'International',
  'Continental', 
  'American',
  'Japanese',
  'Indian',
  'French',
  'Thai',
  'Grill',
  'Cafe',
  'Seafood',
  'Pan-African',
  'Steakhouse',
  'Brazilian',
  'Contemporary Nigerian',
];

const CuisineTypesSection: React.FC<CuisineTypesSectionProps> = ({
  selectedCuisineTypes,
  onCuisineTypeChange,
  disabled = false,
}) => {
  const [customCuisine, setCustomCuisine] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleCustomCuisineAdd = () => {
    if (customCuisine.trim() && !selectedCuisineTypes.includes(customCuisine.trim())) {
      onCuisineTypeChange(customCuisine.trim(), true);
      setCustomCuisine('');
      setShowCustomInput(false);
    }
  };

  const handleCustomCuisineKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCustomCuisineAdd();
    }
  };

  // Get custom cuisines (not in predefined list)
  const customCuisines = selectedCuisineTypes.filter(
    (cuisine) => !cuisineOptions.includes(cuisine)
  );

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2'>
        Cuisine Types
      </h3>
      
      {/* Predefined cuisine options */}
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

      {/* Custom cuisine types */}
      {customCuisines.length > 0 && (
        <div className='space-y-2'>
          <h4 className='text-sm font-medium text-gray-700'>Custom Cuisine Types:</h4>
          <div className='flex flex-wrap gap-2'>
            {customCuisines.map((cuisine) => (
              <span
                key={cuisine}
                className='inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full'
              >
                {cuisine}
                <button
                  type='button'
                  onClick={() => onCuisineTypeChange(cuisine, false)}
                  className='ml-1 inline-flex items-center justify-center w-4 h-4 text-indigo-400 hover:text-indigo-600'
                  disabled={disabled}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Add custom cuisine */}
      <div className='space-y-2'>
        {!showCustomInput ? (
          <button
            type='button'
            onClick={() => setShowCustomInput(true)}
            className='text-sm text-indigo-600 hover:text-indigo-800 font-medium'
            disabled={disabled}
          >
            + Add other cuisine type
          </button>
        ) : (
          <div className='flex gap-2'>
            <input
              type='text'
              value={customCuisine}
              onChange={(e) => setCustomCuisine(e.target.value)}
              onKeyPress={handleCustomCuisineKeyPress}
              placeholder='Enter cuisine type'
              className='flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm'
              disabled={disabled}
            />
            <button
              type='button'
              onClick={handleCustomCuisineAdd}
              className='px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 disabled:opacity-50'
              disabled={disabled || !customCuisine.trim()}
            >
              Add
            </button>
            <button
              type='button'
              onClick={() => {
                setShowCustomInput(false);
                setCustomCuisine('');
              }}
              className='px-3 py-2 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400'
              disabled={disabled}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CuisineTypesSection;
