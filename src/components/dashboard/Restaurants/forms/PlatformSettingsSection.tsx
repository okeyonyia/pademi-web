import React from 'react';

interface PlatformSettingsSectionProps {
  form: {
    platform_discount_percentage: number;
    platform_commission_percentage: number;
    diner_discount_percentage: number;
  };
  onChange: (field: string, value: number) => void;
  disabled?: boolean;
}

const PlatformSettingsSection: React.FC<PlatformSettingsSectionProps> = ({
  form,
  onChange,
  disabled = false,
}) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2'>
        Platform Settings
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <label
            htmlFor='platform_discount'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Platform Discount (%)
          </label>
          <input
            type='number'
            id='platform_discount'
            min='0'
            max='100'
            value={form.platform_discount_percentage}
            onChange={(e) =>
              onChange(
                'platform_discount_percentage',
                parseInt(e.target.value) || 0
              )
            }
            className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900'
            disabled={disabled}
          />
        </div>
        <div>
          <label
            htmlFor='platform_commission'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Platform Commission (%)
          </label>
          <input
            type='number'
            id='platform_commission'
            min='0'
            max='100'
            value={form.platform_commission_percentage}
            onChange={(e) =>
              onChange(
                'platform_commission_percentage',
                parseInt(e.target.value) || 0
              )
            }
            className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900'
            disabled={disabled}
          />
        </div>
        <div>
          <label
            htmlFor='diner_discount'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Diner Discount (%)
          </label>
          <input
            type='number'
            id='diner_discount'
            min='0'
            max='100'
            value={form.diner_discount_percentage}
            onChange={(e) =>
              onChange(
                'diner_discount_percentage',
                parseInt(e.target.value) || 0
              )
            }
            className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900'
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default PlatformSettingsSection;
