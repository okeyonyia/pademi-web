'use client';

import { useState, useEffect, useCallback } from 'react';
import Table from '@/components/common/Table';
import { Restaurant, RestaurantTableData } from './types';
import RestaurantDetail from './RestaurantDetail';
import RestaurantHeader from './RestaurantHeader';
import AddRestaurantModal, { NewRestaurantForm } from './AddRestaurantModal';
import EditRestaurantModal, { EditRestaurantForm } from './EditRestaurantModal';
import { getRestaurantTableColumns } from './RestaurantTableUtils';
import { OpeningHours, DayHours } from './forms/OpeningHoursSection';

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(false);
  const [restaurantToEdit, setRestaurantToEdit] = useState<Restaurant | null>(
    null
  );
  const [editRestaurantForm, setEditRestaurantForm] =
    useState<EditRestaurantForm>({
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
      amenities: [],
      opening_hours: {
        monday: { open: '09:00', close: '22:00', closed: false },
        tuesday: { open: '09:00', close: '22:00', closed: false },
        wednesday: { open: '09:00', close: '22:00', closed: false },
        thursday: { open: '09:00', close: '22:00', closed: false },
        friday: { open: '09:00', close: '23:00', closed: false },
        saturday: { open: '09:00', close: '23:00', closed: false },
        sunday: { open: '10:00', close: '21:00', closed: false },
      },
      is_active: true,
      is_partner: false,
      platform_discount_percentage: 0,
      platform_commission_percentage: 0,
      diner_discount_percentage: 0,
    });
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
      amenities: [],
      opening_hours: {
        monday: { open: '09:00', close: '22:00', closed: false },
        tuesday: { open: '09:00', close: '22:00', closed: false },
        wednesday: { open: '09:00', close: '22:00', closed: false },
        thursday: { open: '09:00', close: '22:00', closed: false },
        friday: { open: '09:00', close: '23:00', closed: false },
        saturday: { open: '09:00', close: '23:00', closed: false },
        sunday: { open: '10:00', close: '21:00', closed: false },
      },
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

  const handleViewRestaurant = useCallback(
    async (restaurantId: string) => {
      try {
        // Find the basic restaurant data from the table
        const basicRestaurantData = restaurants.find(
          (r) => r._id === restaurantId
        );
        if (!basicRestaurantData) {
          console.error('Restaurant not found:', restaurantId);
          return;
        }

        // Create detailed mock data based on the restaurant ID
        const mockDetailedRestaurants: { [key: string]: Restaurant } = {
          '1': {
            _id: '1',
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
          },
          '2': {
            _id: '2',
            name: 'Spicy Lagos Kitchen',
            description:
              'Experience the authentic taste of Nigerian cuisine with our traditional recipes passed down through generations. We specialize in spicy local delicacies and modern African fusion.',
            images: [
              'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=800',
              'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800',
              'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800',
            ],
            location: {
              latitude: 6.5952,
              longitude: 3.3621,
              address: '45 Ikeja GRA, Lagos, Nigeria',
            },
            cuisine_types: ['Nigerian', 'African'],
            price_range: 3,
            phone_number: '+234901234568',
            email: 'info@spicylagos.com',
            website: 'https://spicylagoskitchen.com',
            opening_hours: {
              monday: { open: '10:00', close: '22:00', closed: false },
              tuesday: { open: '10:00', close: '22:00', closed: false },
              wednesday: { open: '10:00', close: '22:00', closed: false },
              thursday: { open: '10:00', close: '22:00', closed: false },
              friday: { open: '10:00', close: '23:00', closed: false },
              saturday: { open: '09:00', close: '23:00', closed: false },
              sunday: { open: '11:00', close: '21:00', closed: false },
            },
            average_rating: 4.2,
            total_reviews: 89,
            is_active: true,
            accepts_reservations: false,
            platform_discount_percentage: 15,
            platform_commission_percentage: 8,
            diner_discount_percentage: 10,
            reviews: [
              {
                reviewer: 'Adebayo O.',
                rating: 5,
                review:
                  'The best jollof rice I have ever tasted! Authentic Nigerian flavors.',
                _id: 'review3',
              },
              {
                reviewer: 'Kemi A.',
                rating: 4,
                review:
                  'Great suya and pepper soup. Service could be faster but food is excellent.',
                _id: 'review4',
              },
            ],
            amenities: ['WiFi', 'Air Conditioning', 'Takeaway', 'Local Music'],
            google_place_id: 'ChIJN1t_tDeuEmsRUsoyG83frY5',
            verified_at: '2024-01-20T14:22:00Z',
            is_partner: false,
            active_personal_dining: [],
            active_public_events: [],
            createdAt: '2024-01-20T14:22:00Z',
            updatedAt: '2024-02-18T10:15:00Z',
          },
          '3': {
            _id: '3',
            name: 'Dragon Palace Chinese',
            description:
              'Exquisite Chinese dining experience with traditional Cantonese cuisine and modern presentation. Our skilled chefs bring authentic flavors from different regions of China.',
            images: [
              'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800',
              'https://images.unsplash.com/photo-1626074353765-518873c2e5d2?w=800',
              'https://images.unsplash.com/photo-1582667165589-85ae3b6ef042?w=800',
            ],
            location: {
              latitude: 6.6018,
              longitude: 3.3515,
              address: '78 Allen Avenue, Ikeja, Lagos, Nigeria',
            },
            cuisine_types: ['Chinese', 'Asian'],
            price_range: 3,
            phone_number: '+234901234569',
            email: 'info@dragonpalace.com',
            website: 'https://dragonpalace.ng',
            opening_hours: {
              monday: { open: '12:00', close: '22:30', closed: false },
              tuesday: { open: '12:00', close: '22:30', closed: false },
              wednesday: { open: '12:00', close: '22:30', closed: false },
              thursday: { open: '12:00', close: '22:30', closed: false },
              friday: { open: '12:00', close: '23:00', closed: false },
              saturday: { open: '11:00', close: '23:00', closed: false },
              sunday: { open: '13:00', close: '21:30', closed: false },
            },
            average_rating: 4.0,
            total_reviews: 203,
            is_active: false,
            accepts_reservations: true,
            platform_discount_percentage: 12,
            platform_commission_percentage: 6,
            diner_discount_percentage: 8,
            reviews: [
              {
                reviewer: 'Michael Chen',
                rating: 4,
                review:
                  'Good dim sum and authentic Chinese flavors. Atmosphere is pleasant.',
                _id: 'review5',
              },
              {
                reviewer: 'Sarah L.',
                rating: 3,
                review:
                  'Food is decent but service can be slow during peak hours.',
                _id: 'review6',
              },
            ],
            amenities: [
              'WiFi',
              'Parking',
              'Private Dining',
              'Air Conditioning',
              'Delivery',
            ],
            google_place_id: 'ChIJN1t_tDeuEmsRUsoyG83frY6',
            verified_at: '2024-02-01T09:15:00Z',
            is_partner: true,
            active_personal_dining: [],
            active_public_events: [],
            createdAt: '2024-02-01T09:15:00Z',
            updatedAt: '2024-02-15T16:30:00Z',
          },
          '4': {
            _id: '4',
            name: 'Continental Bistro',
            description:
              'Fine dining experience featuring contemporary European cuisine with French influences. Our chef-curated menu showcases seasonal ingredients and innovative culinary techniques.',
            images: [
              'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800',
              'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800',
              'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800',
            ],
            location: {
              latitude: 6.4478,
              longitude: 3.4545,
              address: '12 Lekki Phase 1, Lagos, Nigeria',
            },
            cuisine_types: ['Continental', 'French', 'European'],
            price_range: 5,
            phone_number: '+234901234570',
            email: 'reservations@continentalbistro.com',
            website: 'https://continentalbistro.ng',
            opening_hours: {
              monday: { open: '18:00', close: '23:00', closed: false },
              tuesday: { open: '18:00', close: '23:00', closed: false },
              wednesday: { open: '18:00', close: '23:00', closed: false },
              thursday: { open: '18:00', close: '23:00', closed: false },
              friday: { open: '17:00', close: '24:00', closed: false },
              saturday: { open: '17:00', close: '24:00', closed: false },
              sunday: { open: '18:00', close: '22:00', closed: false },
            },
            average_rating: 4.8,
            total_reviews: 56,
            is_active: true,
            accepts_reservations: true,
            platform_discount_percentage: 5,
            platform_commission_percentage: 3,
            diner_discount_percentage: 5,
            reviews: [
              {
                reviewer: 'Isabella M.',
                rating: 5,
                review:
                  'Outstanding fine dining experience. Every dish was a work of art!',
                _id: 'review7',
              },
              {
                reviewer: 'David R.',
                rating: 5,
                review:
                  'Exceptional service and incredible attention to detail. Worth every penny.',
                _id: 'review8',
              },
            ],
            amenities: [
              'WiFi',
              'Parking',
              'Private Dining',
              'Air Conditioning',
              'Wine Cellar',
              'Valet Service',
            ],
            google_place_id: 'ChIJN1t_tDeuEmsRUsoyG83frY7',
            verified_at: '2024-02-10T16:45:00Z',
            is_partner: true,
            active_personal_dining: [],
            active_public_events: [],
            createdAt: '2024-02-10T16:45:00Z',
            updatedAt: '2024-02-25T12:20:00Z',
          },
        };

        // Get the detailed restaurant data or create a fallback
        const mockDetailedRestaurant = mockDetailedRestaurants[
          restaurantId
        ] || {
          _id: restaurantId,
          name: basicRestaurantData.name,
          description:
            'A wonderful dining establishment offering great food and service.',
          images: [
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
          ],
          location: {
            latitude: 6.4281,
            longitude: 3.4219,
            address: basicRestaurantData?.location?.address,
          },
          cuisine_types: basicRestaurantData.cuisine_types,
          price_range: basicRestaurantData.price_range,
          phone_number: '+234901234567',
          email: 'info@restaurant.com',
          website: 'https://restaurant.com',
          opening_hours: {
            monday: { open: '09:00', close: '22:00', closed: false },
            tuesday: { open: '09:00', close: '22:00', closed: false },
            wednesday: { open: '09:00', close: '22:00', closed: false },
            thursday: { open: '09:00', close: '22:00', closed: false },
            friday: { open: '09:00', close: '23:00', closed: false },
            saturday: { open: '09:00', close: '23:00', closed: false },
            sunday: { open: '10:00', close: '21:00', closed: false },
          },
          average_rating: basicRestaurantData.average_rating,
          total_reviews: basicRestaurantData.total_reviews,
          is_active: basicRestaurantData.is_active,
          accepts_reservations: true,
          platform_discount_percentage: 10,
          platform_commission_percentage: 5,
          diner_discount_percentage: 5,
          reviews: [
            {
              reviewer: 'Anonymous',
              rating: 4,
              review: 'Great food and service!',
              _id: 'defaultreview',
            },
          ],
          amenities: ['WiFi', 'Air Conditioning'],
          google_place_id: 'default_place_id',
          verified_at: basicRestaurantData.createdAt,
          is_partner: basicRestaurantData.is_partner,
          active_personal_dining: [],
          active_public_events: [],
          createdAt: basicRestaurantData.createdAt,
          updatedAt: new Date().toISOString(),
        };

        setSelectedRestaurant(mockDetailedRestaurant);
      } catch (error) {
        console.error('Failed to fetch restaurant details:', error);
      }
    },
    [restaurants]
  );

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
        amenities: [],
        opening_hours: {
          monday: { open: '09:00', close: '22:00', closed: false },
          tuesday: { open: '09:00', close: '22:00', closed: false },
          wednesday: { open: '09:00', close: '22:00', closed: false },
          thursday: { open: '09:00', close: '22:00', closed: false },
          friday: { open: '09:00', close: '23:00', closed: false },
          saturday: { open: '09:00', close: '23:00', closed: false },
          sunday: { open: '10:00', close: '21:00', closed: false },
        },
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

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setNewRestaurantForm((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const handleOpeningHoursChange = (
    day: keyof NewRestaurantForm['opening_hours'],
    hours: { open: string; close: string; closed: boolean }
  ) => {
    setNewRestaurantForm((prev) => ({
      ...prev,
      opening_hours: {
        ...prev.opening_hours,
        [day]: hours,
      },
    }));
  };

  // Edit Restaurant Handlers
  const handleEditRestaurant = useCallback((restaurant: Restaurant) => {
    setRestaurantToEdit(restaurant);
    setEditRestaurantForm({
      name: restaurant.name || '',
      description: restaurant.description || '',
      address: restaurant.location?.address || '',
      phone_number: restaurant.phone_number || '',
      email: restaurant.email || '',
      website: restaurant.website || '',
      cuisine_types: restaurant.cuisine_types || [],
      price_range: restaurant.price_range || 3,
      accepts_reservations: restaurant.accepts_reservations || true,
      images: restaurant.images || [],
      amenities: restaurant.amenities || [],
      opening_hours: restaurant.opening_hours || {
        monday: { open: '09:00', close: '22:00', closed: false },
        tuesday: { open: '09:00', close: '22:00', closed: false },
        wednesday: { open: '09:00', close: '22:00', closed: false },
        thursday: { open: '09:00', close: '22:00', closed: false },
        friday: { open: '09:00', close: '23:00', closed: false },
        saturday: { open: '09:00', close: '23:00', closed: false },
        sunday: { open: '10:00', close: '21:00', closed: false },
      },
      is_active: restaurant.is_active || true,
      is_partner: restaurant.is_partner || false,
      platform_discount_percentage:
        restaurant.platform_discount_percentage || 0,
      platform_commission_percentage:
        restaurant.platform_commission_percentage || 0,
      diner_discount_percentage: restaurant.diner_discount_percentage || 0,
    });
    setShowEditModal(true);
  }, []);

  const handleSubmitEditRestaurant = useCallback(async () => {
    if (!editRestaurantForm.name.trim() || !editRestaurantForm.address.trim()) {
      alert('Please fill in at least restaurant name and address');
      return;
    }

    if (!restaurantToEdit) return;

    setEditingRestaurant(true);
    try {
      // Mock API call to update restaurant - replace with actual API
      console.log('Updating restaurant:', editRestaurantForm);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update restaurant in table data
      setRestaurants((prev) =>
        prev.map((restaurant) =>
          restaurant._id === restaurantToEdit._id
            ? {
                ...restaurant,
                name: editRestaurantForm.name,
                cuisine_types: editRestaurantForm.cuisine_types,
                location: { address: editRestaurantForm.address },
                price_range: editRestaurantForm.price_range,
                is_active: editRestaurantForm.is_active,
                is_partner: editRestaurantForm.is_partner,
              }
            : restaurant
        )
      );

      // Update detailed restaurant if it's currently being viewed
      if (selectedRestaurant?._id === restaurantToEdit._id) {
        const updatedRestaurant: Restaurant = {
          ...selectedRestaurant,
          name: editRestaurantForm.name,
          description: editRestaurantForm.description,
          location: {
            ...selectedRestaurant.location,
            address: editRestaurantForm.address,
          },
          phone_number: editRestaurantForm.phone_number,
          email: editRestaurantForm.email,
          website: editRestaurantForm.website,
          cuisine_types: editRestaurantForm.cuisine_types,
          price_range: editRestaurantForm.price_range,
          accepts_reservations: editRestaurantForm.accepts_reservations,
          images: editRestaurantForm.images,
          amenities: editRestaurantForm.amenities,
          opening_hours: editRestaurantForm.opening_hours,
          is_active: editRestaurantForm.is_active,
          is_partner: editRestaurantForm.is_partner,
          platform_discount_percentage:
            editRestaurantForm.platform_discount_percentage,
          platform_commission_percentage:
            editRestaurantForm.platform_commission_percentage,
          diner_discount_percentage:
            editRestaurantForm.diner_discount_percentage,
          updatedAt: new Date().toISOString(),
        };
        setSelectedRestaurant(updatedRestaurant);
      }

      setShowEditModal(false);
      setRestaurantToEdit(null);
    } catch (error) {
      console.error('Failed to update restaurant:', error);
      alert('Failed to update restaurant. Please try again.');
    } finally {
      setEditingRestaurant(false);
    }
  }, [editRestaurantForm, restaurantToEdit, selectedRestaurant]);

  const handleEditFormChange = (field: string, value: string) => {
    setEditRestaurantForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditCuisineTypeChange = (
    cuisineType: string,
    checked: boolean
  ) => {
    setEditRestaurantForm((prev) => ({
      ...prev,
      cuisine_types: checked
        ? [...prev.cuisine_types, cuisineType]
        : prev.cuisine_types.filter((c) => c !== cuisineType),
    }));
  };

  const handleEditImagesChange = (images: string[]) => {
    setEditRestaurantForm((prev) => ({
      ...prev,
      images,
    }));
  };

  const handleEditAmenityChange = (amenity: string, checked: boolean) => {
    setEditRestaurantForm((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const handleEditOpeningHoursChange = (
    day: keyof OpeningHours,
    hours: DayHours
  ) => {
    setEditRestaurantForm((prev) => ({
      ...prev,
      opening_hours: {
        ...prev.opening_hours,
        [day]: hours,
      },
    }));
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
          onEditRestaurant={handleEditRestaurant}
        />

        {/* Edit Restaurant Modal - needs to be rendered here too */}
        <EditRestaurantModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          restaurant={restaurantToEdit}
          form={editRestaurantForm}
          onFormChange={(field: string, value: string | number | boolean) => handleEditFormChange(field, String(value))}
          onCuisineTypeChange={handleEditCuisineTypeChange}
          onImagesChange={handleEditImagesChange}
          onAmenityChange={handleEditAmenityChange}
          onOpeningHoursChange={handleEditOpeningHoursChange}
          onSubmit={handleSubmitEditRestaurant}
          isSubmitting={editingRestaurant}
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
        onFormChange={(field: string, value: string | number | boolean) => handleFormChange(field, String(value))}
        onCuisineTypeChange={handleCuisineTypeChange}
        onImagesChange={handleImagesChange}
        onAmenityChange={handleAmenityChange}
        onOpeningHoursChange={handleOpeningHoursChange}
        onSubmit={handleAddRestaurant}
        isSubmitting={addingRestaurant}
      />

      <EditRestaurantModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        restaurant={restaurantToEdit}
        form={editRestaurantForm}
        onFormChange={(field: string, value: string | number | boolean) => handleEditFormChange(field, String(value))}
        onCuisineTypeChange={handleEditCuisineTypeChange}
        onImagesChange={handleEditImagesChange}
        onAmenityChange={handleEditAmenityChange}
        onOpeningHoursChange={handleEditOpeningHoursChange}
        onSubmit={handleSubmitEditRestaurant}
        isSubmitting={editingRestaurant}
      />
    </div>
  );
};

export default Restaurants;
