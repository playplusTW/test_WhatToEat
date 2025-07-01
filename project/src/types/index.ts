export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  distance: number; // in km
  address: string;
  phone: string;
  website?: string;
  image: string;
  description: string;
  openingHours: {
    [key: string]: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface UserPreferences {
  cuisineTypes: string[];
  priceRange: string[];
  maxDistance: number;
  minRating: number;
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
}

export type ViewMode = 'home' | 'filters' | 'bookmarks' | 'history' | 'map';

export interface WeatherCondition {
  main: string;
  description: string;
  temp: number;
}