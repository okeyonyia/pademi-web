import React from 'react';
import CustomSelect from '@/components/common/CustomSelect';

interface RestaurantSettingsSectionProps {
  form: {
    price_range: number;
    accepts_reservations: boolean;
  };
  onChange: (field: string, value: any) => void;
  disabled?: boolean;
}

const priceRangeOptions = [
  { value: '1', label: '₦2,000 - ₦5,000 (Budget-friendly)', icon: '' },
  { value: '2', label: '₦5,000 - ₦10,000 (Moderate)', icon: '' },
  { value: '3', label: '₦10,000 - ₦20,000 (Mid-range)', icon: '' },
  { value: '4', label: '₦20,000 - ₦40,000 (Upscale)', icon: '' },
  { value: '5', label: '₦40,000+ (Fine dining)', icon: '' },
];

const RestaurantSettingsSection: React.FC<RestaurantSettingsSectionProps> = ({
  form,
  onChange,
  disabled = false,
}) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2'>
        Restaurant Settings
      </h3>
      <div className='flex justify-between'>
        <div>
          <CustomSelect
            label='Price Range'
            options={priceRangeOptions}
            value={form.price_range.toString()}
            onChange={(value) => onChange('price_range', parseInt(value))}
            placeholder='Select price range'
            disabled={disabled}
            size='sm'
          />
        </div>
        <div className='flex items-center gap-2 pt-6'>
          <input
            type='checkbox'
            id='accepts_reservations'
            checked={form.accepts_reservations}
            onChange={(e) => onChange('accepts_reservations', e.target.checked)}
            className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
            disabled={disabled}
          />
          <label
            htmlFor='accepts_reservations'
            className='text-sm font-medium text-gray-700'
          >
            Accepts Reservations
          </label>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSettingsSection;
