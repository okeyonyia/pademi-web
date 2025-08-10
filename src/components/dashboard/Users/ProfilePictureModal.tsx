"use client";

import { useState } from 'react';
import Modal from '@/components/common/Modal';
import SafeImage from '@/components/common/SafeImage';

interface ProfilePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  userName: string;
  initialIndex?: number;
}

const ProfilePictureModal: React.FC<ProfilePictureModalProps> = ({
  isOpen,
  onClose,
  images,
  userName,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') onClose();
  };

  if (!images.length) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${userName}'s Profile Pictures`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-4" onKeyDown={handleKeyPress} tabIndex={0}>
        {/* Main Image Display */}
        <div className="relative bg-gray-100 rounded-xl overflow-hidden" style={{ height: '60vh' }}>
          <SafeImage
            src={images[currentIndex]}
            alt={`${userName} - Profile Picture ${currentIndex + 1}`}
            width={800}
            height={600}
            className="object-contain w-full h-full"
            fallbackInitial={userName.charAt(0)?.toUpperCase() || '?'}
            gradientClasses="from-indigo-500 to-violet-500"
          />

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
                title="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
                title="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded-full backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="flex justify-center space-x-2 overflow-x-auto py-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentIndex
                    ? 'border-indigo-500 ring-2 ring-indigo-200'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <SafeImage
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  fallbackInitial={userName.charAt(0)?.toUpperCase() || '?'}
                  gradientClasses="from-indigo-500 to-violet-500"
                />
              </button>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Use arrow keys to navigate • Press Escape to close
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfilePictureModal;
