import React, { useState } from 'react';

interface AmenitiesSectionProps {
  selectedAmenities: string[];
  onAmenityChange: (amenity: string, checked: boolean) => void;
  disabled?: boolean;
}

// Common amenities from restaurants.data.json
const amenityOptions = [
  'WiFi',
  'Parking',
  'Valet',
  'Outdoor Seating',
  'Garden',
  'Rooftop',
  'Private dining',
  'Chef\'s table',
  'Wine cellar',
  'Family friendly',
  'Live music',
  'Pool area',
  'Terrace',
  'Art gallery',
  'Live shows',
  'Tasting menu',
  'Private events',
  'Air conditioning',
  'Wheelchair accessible',
  'Pet friendly',
];

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  selectedAmenities,
  onAmenityChange,
  disabled = false,
}) => {
  const [customAmenity, setCustomAmenity] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleCustomAmenityAdd = () => {
    if (customAmenity.trim() && !selectedAmenities.includes(customAmenity.trim())) {
      onAmenityChange(customAmenity.trim(), true);
      setCustomAmenity('');
      setShowCustomInput(false);
    }
  };

  const handleCustomAmenityKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCustomAmenityAdd();
    }
  };

  // Get custom amenities (not in predefined list)
  const customAmenities = selectedAmenities.filter(
    (amenity) => !amenityOptions.includes(amenity)
  );

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2'>
        Amenities & Features
      </h3>
      
      {/* Predefined amenity options */}
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
        {amenityOptions.map((amenity) => (
          <label
            key={amenity}
            className='flex items-center gap-2 cursor-pointer'
          >
            <input
              type='checkbox'
              checked={selectedAmenities.includes(amenity)}
              onChange={(e) => onAmenityChange(amenity, e.target.checked)}
              className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
              disabled={disabled}
            />
            <span className='text-sm text-gray-700'>{amenity}</span>
          </label>
        ))}
      </div>

      {/* Custom amenities */}
      {customAmenities.length > 0 && (
        <div className='space-y-2'>
          <h4 className='text-sm font-medium text-gray-700'>Custom Amenities:</h4>
          <div className='flex flex-wrap gap-2'>
            {customAmenities.map((amenity) => (
              <span
                key={amenity}
                className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full'
              >
                {amenity}
                <button
                  type='button'
                  onClick={() => onAmenityChange(amenity, false)}
                  className='ml-1 inline-flex items-center justify-center w-4 h-4 text-blue-400 hover:text-blue-600'
                  disabled={disabled}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Add custom amenity */}
      <div className='space-y-2'>
        {!showCustomInput ? (
          <button
            type='button'
            onClick={() => setShowCustomInput(true)}
            className='text-sm text-indigo-600 hover:text-indigo-800 font-medium'
            disabled={disabled}
          >
            + Add custom amenity
          </button>
        ) : (
          <div className='flex gap-2'>
            <input
              type='text'
              value={customAmenity}
              onChange={(e) => setCustomAmenity(e.target.value)}
              onKeyPress={handleCustomAmenityKeyPress}
              placeholder='Enter amenity name'
              className='flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm'
              disabled={disabled}
            />
            <button
              type='button'
              onClick={handleCustomAmenityAdd}
              className='px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 disabled:opacity-50'
              disabled={disabled || !customAmenity.trim()}
            >
              Add
            </button>
            <button
              type='button'
              onClick={() => {
                setShowCustomInput(false);
                setCustomAmenity('');
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

export default AmenitiesSection;
