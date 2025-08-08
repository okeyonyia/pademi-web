import React from 'react';

interface RestaurantHeaderProps {
  totalRestaurants: number;
  activeRestaurants: number;
  partnerRestaurants: number;
  onAddRestaurant: () => void;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({
  totalRestaurants,
  activeRestaurants,
  partnerRestaurants,
  onAddRestaurant,
}) => {
  return (
    <>
      {/* Header */}
      <div className='bg-gradient-to-r from-indigo-50 via-purple-50 to-violet-50 border border-indigo-200 rounded-2xl p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Restaurant Management
            </h1>
            <p className='text-gray-600'>
              Manage restaurants, view details, ratings, and partnership status
            </p>
          </div>
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-4'>
              <div className='text-right'>
                <div className='text-2xl font-bold text-indigo-600'>
                  {totalRestaurants}
                </div>
                <div className='text-sm text-gray-600'>Total Restaurants</div>
              </div>
              <div className='text-right'>
                <div className='text-2xl font-bold text-emerald-600'>
                  {activeRestaurants}
                </div>
                <div className='text-sm text-gray-600'>Active</div>
              </div>
              <div className='text-right'>
                <div className='text-2xl font-bold text-violet-600'>
                  {partnerRestaurants}
                </div>
                <div className='text-sm text-gray-600'>Partners</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Restaurant Button */}
      <div className='flex justify-end'>
        <button
          onClick={onAddRestaurant}
          className='flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-700 hover:via-purple-700 hover:to-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
        >
          <svg
            className='w-5 h-5'
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
          Add Restaurant
        </button>
      </div>
    </>
  );
};

export default RestaurantHeader;
