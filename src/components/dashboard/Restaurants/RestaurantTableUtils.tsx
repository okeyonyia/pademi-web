import React from 'react';
import { RestaurantTableData } from './types';

export const getPriceRangeDisplay = (priceRange: number): string => {
  const ranges = {
    1: '₦2,000 - ₦5,000',
    2: '₦5,000 - ₦10,000',
    3: '₦10,000 - ₦20,000',
    4: '₦20,000 - ₦40,000',
    5: '₦40,000+',
  };
  return ranges[priceRange as keyof typeof ranges] || ranges[1];
};

export const getStatusConfig = (isActive: boolean) => ({
  bgGradient: isActive
    ? 'from-emerald-500 to-teal-600'
    : 'from-red-500 to-pink-600',
  text: isActive ? 'text-emerald-800' : 'text-red-800',
  badge: isActive
    ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200'
    : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200',
  icon: isActive ? '✅' : '❌',
});

export const getRestaurantTableColumns = () => [
  {
    key: 'name' as keyof RestaurantTableData,
    label: 'Restaurant Name',
    sortable: true,
    render: (value: unknown, restaurant: RestaurantTableData) => (
      <div className='flex flex-col'>
        <span className='font-medium text-gray-900'>{restaurant.name}</span>
        <span className='text-sm text-gray-500'>
          {restaurant.location?.address || 'No address provided'}
        </span>
      </div>
    ),
  },
  {
    key: 'cuisine_types' as keyof RestaurantTableData,
    label: 'Cuisine Types',
    render: (value: unknown, restaurant: RestaurantTableData) => (
      <div className='flex flex-wrap gap-1'>
        {(restaurant.cuisine_types || []).slice(0, 2).map((cuisine, index) => (
          <span
            key={index}
            className='px-2 py-1 bg-gradient-to-r from-indigo-100 via-purple-100 to-violet-100 text-indigo-800 rounded-full text-xs font-medium border border-indigo-200'
          >
            {cuisine}
          </span>
        ))}
        {(restaurant.cuisine_types || []).length > 2 && (
          <span className='text-xs text-gray-500 px-1'>
            +{(restaurant.cuisine_types || []).length - 2} more
          </span>
        )}
      </div>
    ),
  },
  {
    key: 'average_rating' as keyof RestaurantTableData,
    label: 'Rating',
    sortable: true,
    render: (value: unknown, restaurant: RestaurantTableData) => (
      <div className='flex items-center gap-2'>
        <div className='flex'>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-sm ${
                star <= Math.floor(restaurant.average_rating)
                  ? 'text-yellow-400'
                  : star === Math.ceil(restaurant.average_rating) &&
                      restaurant.average_rating % 1 !== 0
                    ? 'text-yellow-200'
                    : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <span className='text-sm text-gray-600'>
          {restaurant.average_rating > 0
            ? restaurant.average_rating.toFixed(1)
            : 'No rating'}{' '}
          ({restaurant.total_reviews})
        </span>
      </div>
    ),
  },
  {
    key: 'price_range' as keyof RestaurantTableData,
    label: 'Price Range',
    sortable: true,
    render: (value: unknown, restaurant: RestaurantTableData) => (
      <span className='font-mono text-green-600 font-medium'>
        {getPriceRangeDisplay(restaurant.price_range)}
      </span>
    ),
  },
  {
    key: 'is_active' as keyof RestaurantTableData,
    label: 'Status',
    sortable: true,
    render: (value: unknown, restaurant: RestaurantTableData) => {
      const config = getStatusConfig(restaurant.is_active);
      return (
        <span
          className={`px-3 py-1 rounded-full ${config.badge} border text-sm font-semibold`}
        >
          {config.icon} {restaurant.is_active ? 'Active' : 'Inactive'}
        </span>
      );
    },
  },
  {
    key: 'is_partner' as keyof RestaurantTableData,
    label: 'Partnership',
    render: (value: unknown, restaurant: RestaurantTableData) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          restaurant.is_partner
            ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        {restaurant.is_partner ? '👑 Partner' : 'Standard'}
      </span>
    ),
  },
  {
    key: 'createdAt' as keyof RestaurantTableData,
    label: 'Created',
    sortable: true,
    render: (value: unknown, restaurant: RestaurantTableData) => (
      <span className='text-sm text-gray-600'>
        {new Date(restaurant.createdAt).toLocaleDateString()}
      </span>
    ),
  },
];
