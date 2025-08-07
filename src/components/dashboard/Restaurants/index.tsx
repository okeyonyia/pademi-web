'use client';

import { useState, useEffect, useCallback } from 'react';
import Table from '@/components/common/Table';
import { Restaurant, RestaurantTableData } from './types';
import RestaurantDetail from './RestaurantDetail';
import Modal from '@/components/common/Modal';
import CustomSelect from '@/components/common/CustomSelect';

// Mock data - replace with actual API calls
const generateMockRestaurants = (): RestaurantTableData[] => [
  {
    _id: '1',
    name: 'Bella Vista Italian Restaurant',
    cuisine_types: ['Italian', 'Mediterranean'],
    location: { address: '123 Victoria Island, Lagos, Nigeria' },
    average_rating: 4.5,
    total_reviews: 127,
    price_range: 4,
    is_active: true,
    is_partner: true,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    _id: '2',
    name: 'Spicy Lagos Kitchen',
    cuisine_types: ['Nigerian', 'African'],
    location: { address: '45 Ikeja GRA, Lagos, Nigeria' },
    average_rating: 4.2,
    total_reviews: 89,
    price_range: 3,
    is_active: true,
    is_partner: false,
    createdAt: '2024-01-20T14:22:00Z',
  },
  {
    _id: '3',
    name: 'Dragon Palace Chinese',
    cuisine_types: ['Chinese', 'Asian'],
    location: { address: '78 Allen Avenue, Ikeja, Lagos, Nigeria' },
    average_rating: 4.0,
    total_reviews: 203,
    price_range: 3,
    is_active: false,
    is_partner: true,
    createdAt: '2024-02-01T09:15:00Z',
  },
  {
    _id: '4',
    name: 'Continental Bistro',
    cuisine_types: ['Continental', 'French', 'European'],
    location: { address: '12 Lekki Phase 1, Lagos, Nigeria' },
    average_rating: 4.8,
    total_reviews: 56,
    price_range: 5,
    is_active: true,
    is_partner: true,
    createdAt: '2024-02-10T16:45:00Z',
  },
];

interface NewRestaurantForm {
  name: string;
  description: string;
  address: string;
  phone_number: string;
  email: string;
  website: string;
  cuisine_types: string[];
  price_range: number;
  accepts_reservations: boolean;
}

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<RestaurantTableData[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addingRestaurant, setAddingRestaurant] = useState(false);
  const [newRestaurantForm, setNewRestaurantForm] = useState<NewRestaurantForm>(
    {
      name: '',
      description: '',
      address: '',
      phone_number: '',
      email: '',
      website: '',
      cuisine_types: [],
      price_range: 3,
      accepts_reservations: true,
    }
  );

  // Mock API call - replace with actual API
  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRestaurants(generateMockRestaurants());
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handleViewRestaurant = useCallback(async (restaurantId: string) => {
    try {
      // Mock detailed restaurant fetch - replace with actual API call
      const mockDetailedRestaurant: Restaurant = {
        _id: restaurantId,
        name: 'Bella Vista Italian Restaurant',
        description:
          'Authentic Italian cuisine with a romantic atmosphere perfect for dining experiences. Our chefs bring traditional recipes from Italy with a modern twist.',
        images: [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
          'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
        ],
        location: {
          latitude: 6.4281,
          longitude: 3.4219,
          address: '123 Victoria Island, Lagos, Nigeria',
        },
        cuisine_types: ['Italian', 'Mediterranean', 'European'],
        price_range: 4,
        phone_number: '+234901234567',
        email: 'info@bellavista.com',
        website: 'https://bellavista.com',
        opening_hours: {
          monday: { open: '11:00', close: '23:00', closed: false },
          tuesday: { open: '11:00', close: '23:00', closed: false },
          wednesday: { open: '11:00', close: '23:00', closed: false },
          thursday: { open: '11:00', close: '23:00', closed: false },
          friday: { open: '11:00', close: '23:30', closed: false },
          saturday: { open: '10:00', close: '23:30', closed: false },
          sunday: { open: '12:00', close: '22:00', closed: false },
        },
        average_rating: 4.5,
        total_reviews: 127,
        is_active: true,
        accepts_reservations: true,
        platform_discount_percentage: 10,
        platform_commission_percentage: 5,
        diner_discount_percentage: 5,
        reviews: [
          {
            reviewer: 'John Doe',
            rating: 5,
            review:
              'Amazing food and great atmosphere! Perfect for a romantic dinner.',
            _id: 'review1',
          },
          {
            reviewer: 'Jane Smith',
            rating: 4,
            review: 'Excellent pasta dishes, will definitely come back.',
            _id: 'review2',
          },
        ],
        amenities: [
          'WiFi',
          'Parking',
          'Outdoor Seating',
          'Live Music',
          'Air Conditioning',
        ],
        google_place_id: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
        verified_at: '2024-01-15T10:30:00Z',
        is_partner: true,
        active_personal_dining: [],
        active_public_events: [],
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-02-20T14:22:00Z',
      };

      setSelectedRestaurant(mockDetailedRestaurant);
    } catch (error) {
      console.error('Failed to fetch restaurant details:', error);
    }
  }, []);

  const handleDeleteRestaurant = useCallback(
    async (restaurantId: string) => {
      try {
        // Mock API call to delete restaurant - replace with actual API
        console.log('Deleting restaurant:', restaurantId);

        // Remove from local state
        setRestaurants((prev) =>
          prev.filter((restaurant) => restaurant._id !== restaurantId)
        );

        // Close detail view if the deleted restaurant was being viewed
        if (selectedRestaurant?._id === restaurantId) {
          setSelectedRestaurant(null);
        }
      } catch (error) {
        console.error('Failed to delete restaurant:', error);
      }
    },
    [selectedRestaurant]
  );

  const handleAddRestaurant = useCallback(async () => {
    if (!newRestaurantForm.name.trim() || !newRestaurantForm.address.trim()) {
      alert('Please fill in at least restaurant name and address');
      return;
    }

    setAddingRestaurant(true);
    try {
      // Mock API call to create restaurant - replace with actual API
      console.log('Creating restaurant:', newRestaurantForm);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create new restaurant object
      const newRestaurant: RestaurantTableData = {
        _id: Date.now().toString(),
        name: newRestaurantForm.name,
        cuisine_types: newRestaurantForm.cuisine_types,
        location: { address: newRestaurantForm.address },
        average_rating: 0,
        total_reviews: 0,
        price_range: newRestaurantForm.price_range,
        is_active: true,
        is_partner: false,
        createdAt: new Date().toISOString(),
      };

      // Add to local state
      setRestaurants((prev) => [newRestaurant, ...prev]);

      // Reset form and close modal
      setNewRestaurantForm({
        name: '',
        description: '',
        address: '',
        phone_number: '',
        email: '',
        website: '',
        cuisine_types: [],
        price_range: 3,
        accepts_reservations: true,
      });
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to create restaurant:', error);
      alert('Failed to create restaurant. Please try again.');
    } finally {
      setAddingRestaurant(false);
    }
  }, [newRestaurantForm]);

  const handleCuisineTypeChange = (cuisineType: string, checked: boolean) => {
    setNewRestaurantForm((prev) => ({
      ...prev,
      cuisine_types: checked
        ? [...prev.cuisine_types, cuisineType]
        : prev.cuisine_types.filter((c) => c !== cuisineType),
    }));
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

  const priceRangeOptions = [
    { value: '1', label: '₦2,000 - ₦5,000 (Budget-friendly)', icon: '' },
    { value: '2', label: '₦5,000 - ₦10,000 (Moderate)', icon: '' },
    { value: '3', label: '₦10,000 - ₦20,000 (Mid-range)', icon: '' },
    { value: '4', label: '₦20,000 - ₦40,000 (Upscale)', icon: '' },
    { value: '5', label: '₦40,000+ (Fine dining)', icon: '' },
  ];

  const getStatusConfig = (isActive: boolean) => ({
    bgGradient: isActive
      ? 'from-emerald-500 to-teal-600'
      : 'from-red-500 to-pink-600',
    text: isActive ? 'text-emerald-800' : 'text-red-800',
    badge: isActive
      ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200'
      : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200',
    icon: isActive ? '✅' : '❌',
  });

  const columns = [
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
          {(restaurant.cuisine_types || [])
            .slice(0, 2)
            .map((cuisine, index) => (
              <span
                key={index}
                className='px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-xs font-medium border border-purple-200'
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

  if (selectedRestaurant) {
    return (
      <div>
        <div className='mb-6'>
          <button
            onClick={() => setSelectedRestaurant(null)}
            className='flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors duration-200'
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
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            Back to Restaurants
          </button>
        </div>
        <RestaurantDetail
          restaurant={selectedRestaurant}
          onDeleteRestaurant={handleDeleteRestaurant}
        />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6'>
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
                <div className='text-2xl font-bold text-purple-600'>
                  {restaurants.length}
                </div>
                <div className='text-sm text-gray-600'>Total Restaurants</div>
              </div>
              <div className='text-right'>
                <div className='text-2xl font-bold text-emerald-600'>
                  {restaurants.filter((r) => r.is_active).length}
                </div>
                <div className='text-sm text-gray-600'>Active</div>
              </div>
              <div className='text-right'>
                <div className='text-2xl font-bold text-blue-600'>
                  {restaurants.filter((r) => r.is_partner).length}
                </div>
                <div className='text-sm text-gray-600'>Partners</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-end'>
        <button
          onClick={() => setShowAddModal(true)}
          className='flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
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
      <div className='bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden'>
        <div className='p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
            🏪 Restaurants Overview
          </h2>
        </div>
        <Table
          data={restaurants}
          columns={columns}
          rowKey='_id'
          loading={loading}
          onRowClick={(restaurant) => handleViewRestaurant(restaurant._id)}
          emptyMessage='No restaurants found'
        />
      </div>

      {/* Add Restaurant Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => !addingRestaurant && setShowAddModal(false)}
        title='Add New Restaurant'
        maxWidth='max-w-2xl'
      >
        <div className='space-y-6'>
          {/* Basic Information */}
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
                  value={newRestaurantForm.name}
                  onChange={(e) =>
                    setNewRestaurantForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='Enter restaurant name'
                  disabled={addingRestaurant}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Phone Number
                </label>
                <input
                  type='tel'
                  value={newRestaurantForm.phone_number}
                  onChange={(e) =>
                    setNewRestaurantForm((prev) => ({
                      ...prev,
                      phone_number: e.target.value,
                    }))
                  }
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='+234XXXXXXXXXX'
                  disabled={addingRestaurant}
                />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Address *
              </label>
              <input
                type='text'
                value={newRestaurantForm.address}
                onChange={(e) =>
                  setNewRestaurantForm((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Enter full address'
                disabled={addingRestaurant}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Description
              </label>
              <textarea
                value={newRestaurantForm.description}
                onChange={(e) =>
                  setNewRestaurantForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none'
                placeholder='Brief description of the restaurant'
                disabled={addingRestaurant}
              />
            </div>
          </div>

          {/* Contact & Website */}
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
                  value={newRestaurantForm.email}
                  onChange={(e) =>
                    setNewRestaurantForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='restaurant@example.com'
                  disabled={addingRestaurant}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Website
                </label>
                <input
                  type='url'
                  value={newRestaurantForm.website}
                  onChange={(e) =>
                    setNewRestaurantForm((prev) => ({
                      ...prev,
                      website: e.target.value,
                    }))
                  }
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='https://restaurant.com'
                  disabled={addingRestaurant}
                />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2'>
              Restaurant Settings
            </h3>
            <div className='flex justify-between'>
              <div>
                <CustomSelect
                  label='Price Range'
                  options={priceRangeOptions}
                  value={newRestaurantForm.price_range.toString()}
                  onChange={(value) =>
                    setNewRestaurantForm((prev) => ({
                      ...prev,
                      price_range: parseInt(value),
                    }))
                  }
                  placeholder='Select price range'
                  disabled={addingRestaurant}
                  size='sm'
                />
              </div>
              <div className='flex items-center gap-2 pt-6'>
                <input
                  type='checkbox'
                  id='accepts_reservations'
                  checked={newRestaurantForm.accepts_reservations}
                  onChange={(e) =>
                    setNewRestaurantForm((prev) => ({
                      ...prev,
                      accepts_reservations: e.target.checked,
                    }))
                  }
                  className='rounded border-gray-300 text-purple-600 focus:ring-purple-500'
                  disabled={addingRestaurant}
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

          {/* Cuisine Types */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2'>
              Cuisine Types
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
              {[
                'Italian',
                'Chinese',
                'Nigerian',
                'Continental',
                'Indian',
                'Mexican',
                'Japanese',
                'Thai',
                'French',
                'Mediterranean',
                'American',
                'African',
                'Korean',
                'Lebanese',
                'Turkish',
              ].map((cuisine) => (
                <label
                  key={cuisine}
                  className='flex items-center gap-2 cursor-pointer'
                >
                  <input
                    type='checkbox'
                    checked={newRestaurantForm.cuisine_types.includes(cuisine)}
                    onChange={(e) =>
                      handleCuisineTypeChange(cuisine, e.target.checked)
                    }
                    className='rounded border-gray-300 text-purple-600 focus:ring-purple-500'
                    disabled={addingRestaurant}
                  />
                  <span className='text-sm text-gray-700'>{cuisine}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-3 pt-6 border-t border-gray-200'>
            <button
              onClick={() => setShowAddModal(false)}
              disabled={addingRestaurant}
              className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50'
            >
              Cancel
            </button>
            <button
              onClick={handleAddRestaurant}
              disabled={
                addingRestaurant ||
                !newRestaurantForm.name.trim() ||
                !newRestaurantForm.address.trim()
              }
              className='flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {addingRestaurant ? (
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
    </div>
  );
};

export default Restaurants;
