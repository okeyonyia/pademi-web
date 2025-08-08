'use client';

import { useState, useEffect, useCallback } from 'react';
import Table from '@/components/common/Table';
import { Restaurant, RestaurantTableData } from './types';
import RestaurantDetail from './RestaurantDetail';
import RestaurantHeader from './RestaurantHeader';
import AddRestaurantModal, { NewRestaurantForm } from './AddRestaurantModal';
import { getRestaurantTableColumns } from './RestaurantTableUtils';

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
      images: [],
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
        images: [],
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

  const handleImagesChange = (images: string[]) => {
    setNewRestaurantForm((prev) => ({
      ...prev,
      images,
    }));
  };

  const handleFormChange = (field: string, value: string) => {
    setNewRestaurantForm((prev) => ({ ...prev, [field]: value }));
  };

  const columns = getRestaurantTableColumns();

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
      <RestaurantHeader
        totalRestaurants={restaurants.length}
        activeRestaurants={restaurants.filter((r) => r.is_active).length}
        partnerRestaurants={restaurants.filter((r) => r.is_partner).length}
        onAddRestaurant={() => setShowAddModal(true)}
      />

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

      <AddRestaurantModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        form={newRestaurantForm}
        onFormChange={handleFormChange}
        onCuisineTypeChange={handleCuisineTypeChange}
        onImagesChange={handleImagesChange}
        onSubmit={handleAddRestaurant}
        isSubmitting={addingRestaurant}
      />
    </div>
  );
};

export default Restaurants;
