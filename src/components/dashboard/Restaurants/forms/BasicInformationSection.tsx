import React from 'react';

interface BasicInformationSectionProps {
  form: {
    name: string;
    phone_number: string;
    address: string;
    description: string;
  };
  onChange: (field: string, value: string) => void;
  disabled?: boolean;
}

const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
  form,
  onChange,
  disabled = false,
}) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2'>
        Basic Information
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Restaurant Name *
          </label>
          <input
            type='text'
            value={form.name}
            onChange={(e) => onChange('name', e.target.value)}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='Enter restaurant name'
            disabled={disabled}
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Phone Number
          </label>
          <input
            type='tel'
            value={form.phone_number}
            onChange={(e) => onChange('phone_number', e.target.value)}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='+234XXXXXXXXXX'
            disabled={disabled}
          />
        </div>
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Address *
        </label>
        <input
          type='text'
          value={form.address}
          onChange={(e) => onChange('address', e.target.value)}
          className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          placeholder='Enter full address'
          disabled={disabled}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => onChange('description', e.target.value)}
          className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none'
          placeholder='Brief description of the restaurant'
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default BasicInformationSection;
