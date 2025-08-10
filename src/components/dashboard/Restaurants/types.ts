export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface OpeningHours {
  open: string;
  close: string;
  closed: boolean;
}

export interface RestaurantHours {
  monday: OpeningHours;
  tuesday: OpeningHours;
  wednesday: OpeningHours;
  thursday: OpeningHours;
  friday: OpeningHours;
  saturday: OpeningHours;
  sunday: OpeningHours;
}

export interface RestaurantReview {
  reviewer: string;
  rating: number;
  review?: string;
  personal_dining?: string;
  _id?: string;
}

export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  images: string[];
  location: Location;
  cuisine_types: string[];
  price_range: number;
  phone_number: string;
  email?: string;
  website?: string;
  opening_hours: RestaurantHours;
  average_rating: number;
  total_reviews: number;
  is_active: boolean;
  accepts_reservations: boolean;
  platform_discount_percentage: number;
  platform_commission_percentage: number;
  diner_discount_percentage: number;
  reviews: RestaurantReview[];
  amenities: string[];
  google_place_id?: string;
  verified_at?: string;
  is_partner: boolean;
  active_personal_dining: string[];
  active_public_events: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantTableData {
  _id: string;
  name: string;
  cuisine_types?: string[];
  location?: {
    address: string;
  };
  average_rating: number;
  total_reviews: number;
  price_range: number;
  is_active: boolean;
  is_partner: boolean;
  createdAt: string;
}
