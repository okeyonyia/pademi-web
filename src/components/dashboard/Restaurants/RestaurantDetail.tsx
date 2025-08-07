'use client';

import { useState } from 'react';
import { Restaurant } from './types';
import SafeImage from '@/components/common/SafeImage';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onDeleteRestaurant?: (restaurantId: string) => void;
}

const RestaurantDetail: React.FC<RestaurantDetailProps> = ({
  restaurant,
  onDeleteRestaurant,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusConfig = (isActive: boolean) => {
    if (isActive) {
      return {
        bgGradient: 'from-emerald-500 to-teal-600',
        bgLight: 'from-emerald-50 to-teal-50',
        border: 'border-emerald-200',
        text: 'text-emerald-800',
        icon: '✅',
        badge:
          'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200',
      };
    } else {
      return {
        bgGradient: 'from-red-500 to-pink-600',
        bgLight: 'from-red-50 to-pink-50',
        border: 'border-red-200',
        text: 'text-red-800',
        icon: '❌',
        badge:
          'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200',
      };
    }
  };

  const getPriceRangeDisplay = (priceRange: number): string => {
    const ranges = {
      1: '₦2,000 - ₦5,000',
      2: '₦5,000 - ₦10,000',
      3: '₦10,000 - ₦20,000',
      4: '₦20,000 - ₦40,000',
      5: '₦40,000+',
    };
    return ranges[priceRange as keyof typeof ranges] || ranges[1];
  };

  const formatTime = (time: string): string => {
    // Convert 24h format to 12h format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getDayStatus = (dayHours: {
    open: string;
    close: string;
    closed: boolean;
  }) => {
    if (dayHours.closed) {
      return 'Closed';
    }
    return `${formatTime(dayHours.open)} - ${formatTime(dayHours.close)}`;
  };

  const averageRating = restaurant.average_rating || 0;
  const config = getStatusConfig(restaurant.is_active);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDeleteRestaurant?.(restaurant._id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete restaurant:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Restaurant Header */}
      <div
        className={`bg-gradient-to-br ${config.bgLight} border ${config.border} rounded-2xl p-6`}
      >
        <div className='flex items-start space-x-6'>
          {/* Main Image */}
          <div className='flex-shrink-0'>
            <div className='relative'>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${config.bgGradient} rounded-2xl blur-md opacity-75 scale-110`}
              ></div>
              <SafeImage
                src={restaurant.images?.[0] || ''}
                alt='Restaurant'
                width={160}
                height={160}
                className='rounded-2xl border-4 border-white shadow-lg'
                fallbackInitial={
                  restaurant.name?.charAt(0)?.toUpperCase() || '?'
                }
                gradientClasses={config.bgGradient}
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className='flex-1'>
            <div className='flex items-start justify-between mb-4'>
              <div className='flex-1'>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                  {restaurant.name}
                </h3>
                <div className='flex items-center gap-3 mb-3'>
                  <span
                    className={`px-3 py-1 rounded-full ${config.badge} border text-sm font-semibold`}
                  >
                    {config.icon} {restaurant.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      restaurant.is_partner
                        ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {restaurant.is_partner ? '👑 Partner' : 'Standard'}
                  </span>
                  <span className='px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200'>
                    {getPriceRangeDisplay(restaurant.price_range)}
                  </span>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex items-center gap-2'>
                <span className='text-gray-500'>📍</span>
                <span className='text-gray-700'>
                  {restaurant.location?.address || 'Address not provided'}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-gray-500'>📞</span>
                <span className='text-gray-700'>
                  {restaurant.phone_number || 'Not provided'}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-gray-500'>⭐</span>
                <div className='flex items-center gap-1'>
                  <div className='flex'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-sm ${
                          star <= averageRating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className='text-gray-700'>
                    {averageRating.toFixed(1)} ({restaurant.total_reviews}{' '}
                    reviews)
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-gray-500'>🍽️</span>
                <span className='text-gray-700'>
                  {restaurant.accepts_reservations
                    ? 'Accepts Reservations'
                    : 'Walk-ins Only'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Details */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Cuisine & Description */}
        <div className='bg-white border border-gray-200 rounded-2xl p-6'>
          <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
            <span>🍳</span> Cuisine & Details
          </h4>

          {/* Cuisine Types */}
          <div className='mb-4'>
            <span className='text-sm font-medium text-gray-700 mb-2 block'>
              Cuisine Types:
            </span>
            <div className='flex flex-wrap gap-2'>
              {restaurant.cuisine_types?.map((cuisine, index) => (
                <span
                  key={index}
                  className='px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200'
                >
                  {cuisine}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          {restaurant.description && (
            <div>
              <span className='text-sm font-medium text-gray-700 mb-2 block'>
                Description:
              </span>
              <p className='text-gray-700 leading-relaxed'>
                {restaurant.description}
              </p>
            </div>
          )}
        </div>

        {/* Contact & Links */}
        <div className='bg-white border border-gray-200 rounded-2xl p-6'>
          <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
            <span>📧</span> Contact Information
          </h4>
          <div className='space-y-3'>
            {restaurant.email && (
              <div>
                <span className='font-medium text-gray-700'>Email:</span>
                <p className='text-gray-600'>
                  <a
                    href={`mailto:${restaurant.email}`}
                    className='text-blue-600 hover:underline'
                  >
                    {restaurant.email}
                  </a>
                </p>
              </div>
            )}
            {restaurant.website && (
              <div>
                <span className='font-medium text-gray-700'>Website:</span>
                <p className='text-gray-600'>
                  <a
                    href={restaurant.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline'
                  >
                    {restaurant.website}
                  </a>
                </p>
              </div>
            )}
            <div>
              <span className='font-medium text-gray-700'>Location:</span>
              <p className='text-gray-600'>
                {restaurant.location?.address}
                {restaurant.location?.latitude &&
                  restaurant.location?.longitude && (
                    <span className='text-xs text-gray-500 ml-2'>
                      ({restaurant.location.latitude.toFixed(6)},{' '}
                      {restaurant.location.longitude.toFixed(6)})
                    </span>
                  )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Opening Hours */}
      <div className='bg-white border border-gray-200 rounded-2xl p-6'>
        <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
          <span>🕐</span> Opening Hours
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {Object.entries(restaurant.opening_hours || {}).map(
            ([day, hours]) => (
              <div
                key={day}
                className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'
              >
                <span className='font-medium text-gray-700 capitalize'>
                  {day}:
                </span>
                <span
                  className={`text-sm ${hours.closed ? 'text-red-600' : 'text-gray-600'}`}
                >
                  {getDayStatus(hours)}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Amenities */}
      {restaurant.amenities && restaurant.amenities.length > 0 && (
        <div className='bg-white border border-gray-200 rounded-2xl p-6'>
          <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
            <span>🎯</span> Amenities
          </h4>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {restaurant.amenities.map((amenity, index) => (
              <div
                key={index}
                className='flex items-center gap-2 p-2 bg-gray-50 rounded-lg'
              >
                <span className='text-green-500 text-sm'>✓</span>
                <span className='text-gray-700 text-sm'>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Gallery */}
      {restaurant.images && restaurant.images.length > 1 && (
        <div className='bg-white border border-gray-200 rounded-2xl p-6'>
          <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
            <span>🖼️</span> Image Gallery
          </h4>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {restaurant.images.map((image, index) => (
              <div
                key={index}
                className='aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300'
              >
                <SafeImage
                  src={image || ''}
                  alt={`Restaurant image ${index + 1}`}
                  width={300}
                  height={300}
                  className='rounded-xl hover:scale-105 transition-transform duration-300'
                  fallbackInitial={
                    restaurant.name?.charAt(0)?.toUpperCase() || '?'
                  }
                  gradientClasses='from-purple-500 to-pink-500'
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Platform Settings */}
      <div className='bg-white border border-gray-200 rounded-2xl p-6'>
        <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
          <span>💰</span> Platform Settings
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='text-center p-4 bg-blue-50 rounded-lg border border-blue-200'>
            <div className='text-2xl font-bold text-blue-600'>
              {restaurant.platform_discount_percentage}%
            </div>
            <div className='text-sm text-blue-800 font-medium'>
              Platform Discount
            </div>
          </div>
          <div className='text-center p-4 bg-green-50 rounded-lg border border-green-200'>
            <div className='text-2xl font-bold text-green-600'>
              {restaurant.platform_commission_percentage}%
            </div>
            <div className='text-sm text-green-800 font-medium'>
              Platform Commission
            </div>
          </div>
          <div className='text-center p-4 bg-purple-50 rounded-lg border border-purple-200'>
            <div className='text-2xl font-bold text-purple-600'>
              {restaurant.diner_discount_percentage}%
            </div>
            <div className='text-sm text-purple-800 font-medium'>
              Diner Discount
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Summary */}
      {restaurant.reviews && restaurant.reviews.length > 0 && (
        <div className='bg-white border border-gray-200 rounded-2xl p-6'>
          <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
            <span>⭐</span> Recent Reviews ({restaurant.reviews.length})
          </h4>
          <div className='space-y-4 max-h-60 overflow-y-auto'>
            {restaurant.reviews.slice(0, 5).map((review, index) => (
              <div key={index} className='border-l-2 border-gray-200 pl-4'>
                <div className='flex items-center gap-2 mb-1'>
                  <div className='flex'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-sm ${
                          star <= review.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className='text-xs text-gray-500'>
                    by {review.reviewer}
                  </span>
                </div>
                {review.review && (
                  <p className='text-sm text-gray-700'>{review.review}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Management Actions */}
      <div className='bg-white border border-gray-200 rounded-2xl p-6'>
        <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
          <span>⚙️</span> Restaurant Management
        </h4>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Status Information */}
          <div className='space-y-3'>
            <label className='block text-sm font-semibold text-gray-700 uppercase tracking-wider'>
              Current Status
            </label>
            <div className={`p-4 rounded-xl ${config.badge} border`}>
              <div className='flex items-center justify-between mb-3'>
                <span className='font-medium'>Restaurant Status:</span>
                <span className='flex items-center gap-1'>
                  {config.icon} {restaurant.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className='text-sm opacity-80'>
                {restaurant.is_active
                  ? 'Restaurant is currently accepting bookings and visible to users.'
                  : 'Restaurant is currently deactivated and not visible to users.'}
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className='space-y-3'>
            <label className='block text-sm font-semibold text-gray-700 uppercase tracking-wider'>
              Danger Zone
            </label>
            <div className='p-4 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-200'>
              <div className='mb-3'>
                <span className='font-medium text-red-800'>
                  Delete Restaurant
                </span>
                <p className='text-sm text-red-600 mt-1'>
                  This action will deactivate the restaurant and remove it from
                  public view.
                </p>
              </div>

              {onDeleteRestaurant && (
                <button
                  onClick={handleDeleteClick}
                  className='w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300'
                >
                  🗑️ Delete Restaurant
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className='bg-gray-50 border border-gray-200 rounded-2xl p-6'>
        <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
          <span>ℹ️</span> System Information
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
          <div>
            <span className='font-medium text-gray-700'>Restaurant ID:</span>
            <p className='text-gray-600 font-mono bg-white px-2 py-1 rounded mt-1'>
              {restaurant._id}
            </p>
          </div>
          {restaurant.google_place_id && (
            <div>
              <span className='font-medium text-gray-700'>
                Google Place ID:
              </span>
              <p className='text-gray-600 font-mono bg-white px-2 py-1 rounded mt-1'>
                {restaurant.google_place_id}
              </p>
            </div>
          )}
          <div>
            <span className='font-medium text-gray-700'>Created:</span>
            <p className='text-gray-600 bg-white px-2 py-1 rounded mt-1'>
              {new Date(restaurant.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <span className='font-medium text-gray-700'>Last Updated:</span>
            <p className='text-gray-600 bg-white px-2 py-1 rounded mt-1'>
              {new Date(restaurant.updatedAt).toLocaleDateString()}
            </p>
          </div>
          {restaurant.verified_at && (
            <div>
              <span className='font-medium text-gray-700'>Verified At:</span>
              <p className='text-gray-600 bg-white px-2 py-1 rounded mt-1'>
                {new Date(restaurant.verified_at).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title='Delete Restaurant'
        description='This action will permanently deactivate the restaurant and remove it from public view. All associated bookings, reviews, and dining experiences will be preserved but the restaurant will no longer be accessible to users.'
        itemName={restaurant.name}
        itemType='restaurant'
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default RestaurantDetail;
