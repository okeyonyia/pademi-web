import React from 'react';
import Modal from '@/components/common/Modal';
import BasicInformationSection from './forms/BasicInformationSection';
import ContactInformationSection from './forms/ContactInformationSection';
import RestaurantSettingsSection from './forms/RestaurantSettingsSection';
import CuisineTypesSection from './forms/CuisineTypesSection';
import RestaurantImagesSection from './forms/RestaurantImagesSection';
import AmenitiesSection from './forms/AmenitiesSection';
import OpeningHoursSection, {
  OpeningHours,
  DayHours,
} from './forms/OpeningHoursSection';

export interface NewRestaurantForm {
  name: string;
  description: string;
  address: string;
  google_place_id?: string;
  latitude?: string;
  longitude?: string;
  phone_number: string;
  email: string;
  website: string;
  cuisine_types: string[];
  price_range: number;
  accepts_reservations: boolean;
  images: string[];
  amenities: string[];
  opening_hours: OpeningHours;
}

interface AddRestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: NewRestaurantForm;
  onFormChange: (field: string, value: string | number | boolean) => void;
  onCuisineTypeChange: (cuisine: string, checked: boolean) => void;
  onImagesChange: (images: string[]) => void;
  onAmenityChange: (amenity: string, checked: boolean) => void;
  onOpeningHoursChange: (day: keyof OpeningHours, hours: DayHours) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const AddRestaurantModal: React.FC<AddRestaurantModalProps> = ({
  isOpen,
  onClose,
  form,
  onFormChange,
  onCuisineTypeChange,
  onImagesChange,
  onAmenityChange,
  onOpeningHoursChange,
  onSubmit,
  isSubmitting,
}) => {
  const isFormValid = form.name.trim() && form.address.trim();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => !isSubmitting && onClose()}
      title='Add New Restaurant'
      maxWidth='max-w-4xl'
    >
      <div className='space-y-6'>
        {/* Basic Information */}
        <BasicInformationSection
          form={{
            name: form.name,
            phone_number: form.phone_number,
            address: form.address,
            description: form.description,
          }}
          onChange={onFormChange}
          disabled={isSubmitting}
        />

        {/* Contact & Website */}
        <ContactInformationSection
          form={{
            email: form.email,
            website: form.website,
          }}
          onChange={onFormChange}
          disabled={isSubmitting}
        />

        {/* Settings */}
        <RestaurantSettingsSection
          form={{
            price_range: form.price_range,
            accepts_reservations: form.accepts_reservations,
          }}
          onChange={onFormChange}
          disabled={isSubmitting}
        />

        {/* Cuisine Types */}
        <CuisineTypesSection
          selectedCuisineTypes={form.cuisine_types}
          onCuisineTypeChange={onCuisineTypeChange}
          disabled={isSubmitting}
        />

        {/* Restaurant Images */}
        <RestaurantImagesSection
          images={form.images}
          onImagesChange={onImagesChange}
          disabled={isSubmitting}
        />

        {/* Amenities */}
        <AmenitiesSection
          selectedAmenities={form.amenities}
          onAmenityChange={onAmenityChange}
          disabled={isSubmitting}
        />

        {/* Opening Hours */}
        <OpeningHoursSection
          openingHours={form.opening_hours}
          onHoursChange={onOpeningHoursChange}
          disabled={isSubmitting}
        />

        {/* Action Buttons */}
        <div className='flex justify-end gap-3 pt-6 border-t border-gray-200'>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50'
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting || !isFormValid}
            className='flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-700 hover:via-purple-700 hover:to-violet-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSubmitting ? (
              <>
                <div className='animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent'></div>
                Creating...
              </>
            ) : (
              <>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                  />
                </svg>
                Create Restaurant
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddRestaurantModal;
