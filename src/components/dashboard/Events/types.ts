export interface Event {
  _id: string;
  title: string;
  event_type: string;
  description: string;
  start_date: string;
  end_date: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
    _id?: string;
  };
  cover_picture: string;
  ticket_price: number;
  no_of_attendees: number;
  slots: number;
  attendees: string[]; // Assuming array of profile IDs
  is_public: boolean;
  reviews: {
    reviewer: string; // Profile ID
    rating: number;
    review?: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;

  host_id: {
    _id: string;
    full_name: string;
    profile_pictures?: string[];
  };
}
