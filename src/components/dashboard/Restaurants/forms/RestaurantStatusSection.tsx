import React from 'react';

interface RestaurantStatusSectionProps {
  form: {
    is_active: boolean;
    is_partner: boolean;
  };
  onChange: (field: string, value: boolean) => void;
  disabled?: boolean;
}

const RestaurantStatusSection: React.FC<RestaurantStatusSectionProps> = ({
  form,
  onChange,
  disabled = false,
}) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2'>
        Restaurant Status & Partnership
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='is_active'
            checked={form.is_active}
            onChange={(e) => onChange('is_active', e.target.checked)}
            className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
            disabled={disabled}
          />
          <label
            htmlFor='is_active'
            className='text-sm font-medium text-gray-700'
          >
            Restaurant is Active
          </label>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='is_partner'
            checked={form.is_partner}
            onChange={(e) => onChange('is_partner', e.target.checked)}
            className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
            disabled={disabled}
          />
          <label
            htmlFor='is_partner'
            className='text-sm font-medium text-gray-700'
          >
            Partner Restaurant
          </label>
        </div>
      </div>
    </div>
  );
};

export default RestaurantStatusSection;
