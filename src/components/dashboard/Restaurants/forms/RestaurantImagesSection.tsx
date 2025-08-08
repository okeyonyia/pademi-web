import React from 'react';
import ImageUpload from '@/components/common/ImageUpload';

interface RestaurantImagesSectionProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  disabled?: boolean;
}

const RestaurantImagesSection: React.FC<RestaurantImagesSectionProps> = ({
  images,
  onImagesChange,
  disabled = false,
}) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2'>
        Restaurant Images
      </h3>
      <p className='text-sm text-gray-600 mb-4'>
        Add photos of your restaurant to showcase the ambiance, food, and dining
        experience. The first image will be used as the primary image.
      </p>
      <ImageUpload
        images={images}
        onImagesChange={onImagesChange}
        maxImages={8}
        maxFileSize={10}
        disabled={disabled}
        className=''
      />
    </div>
  );
};

export default RestaurantImagesSection;
