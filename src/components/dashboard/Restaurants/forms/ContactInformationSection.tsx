import React from 'react';

interface ContactInformationSectionProps {
  form: {
    email: string;
    website: string;
  };
  onChange: (field: string, value: string) => void;
  disabled?: boolean;
}

const ContactInformationSection: React.FC<ContactInformationSectionProps> = ({
  form,
  onChange,
  disabled = false,
}) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2'>
        Contact & Website
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Email
          </label>
          <input
            type='email'
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
            placeholder='restaurant@example.com'
            disabled={disabled}
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Website
          </label>
          <input
            type='url'
            value={form.website}
            onChange={(e) => onChange('website', e.target.value)}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='https://restaurant.com'
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformationSection;
