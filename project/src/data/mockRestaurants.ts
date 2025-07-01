import { Restaurant } from '../types';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Sakura Sushi',
    cuisine: 'Japanese',
    rating: 4.6,
    priceRange: '$$$',
    distance: 0.5,
    address: '123 Main St, Downtown',
    phone: '+1 (555) 123-4567',
    website: 'https://sakurasushi.com',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Authentic Japanese sushi restaurant with fresh ingredients and traditional preparation.',
    openingHours: {
      'Monday': '11:00 AM - 10:00 PM',
      'Tuesday': '11:00 AM - 10:00 PM',
      'Wednesday': '11:00 AM - 10:00 PM',
      'Thursday': '11:00 AM - 10:00 PM',
      'Friday': '11:00 AM - 11:00 PM',
      'Saturday': '5:00 PM - 11:00 PM',
      'Sunday': '5:00 PM - 9:00 PM'
    },
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: '2',
    name: 'Mama\'s Italian Kitchen',
    cuisine: 'Italian',
    rating: 4.4,
    priceRange: '$$',
    distance: 0.8,
    address: '456 Oak Ave, Little Italy',
    phone: '+1 (555) 234-5678',
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Family-owned Italian restaurant serving homemade pasta and wood-fired pizzas.',
    openingHours: {
      'Monday': 'Closed',
      'Tuesday': '5:00 PM - 10:00 PM',
      'Wednesday': '5:00 PM - 10:00 PM',
      'Thursday': '5:00 PM - 10:00 PM',
      'Friday': '5:00 PM - 11:00 PM',
      'Saturday': '12:00 PM - 11:00 PM',
      'Sunday': '12:00 PM - 9:00 PM'
    },
    coordinates: { lat: 40.7180, lng: -73.9960 }
  },
  {
    id: '3',
    name: 'Spice Junction',
    cuisine: 'Indian',
    rating: 4.7,
    priceRange: '$$',
    distance: 1.2,
    address: '789 Curry Lane, Spice District',
    phone: '+1 (555) 345-6789',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Authentic Indian cuisine with aromatic spices and traditional cooking methods.',
    openingHours: {
      'Monday': '11:30 AM - 2:30 PM, 5:30 PM - 10:00 PM',
      'Tuesday': '11:30 AM - 2:30 PM, 5:30 PM - 10:00 PM',
      'Wednesday': '11:30 AM - 2:30 PM, 5:30 PM - 10:00 PM',
      'Thursday': '11:30 AM - 2:30 PM, 5:30 PM - 10:00 PM',
      'Friday': '11:30 AM - 2:30 PM, 5:30 PM - 10:30 PM',
      'Saturday': '12:00 PM - 10:30 PM',
      'Sunday': '12:00 PM - 9:30 PM'
    },
    coordinates: { lat: 40.7589, lng: -73.9851 }
  },
  {
    id: '4',
    name: 'The Burger Joint',
    cuisine: 'American',
    rating: 4.2,
    priceRange: '$',
    distance: 0.3,
    address: '321 Burger Blvd, Food Court',
    phone: '+1 (555) 456-7890',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Gourmet burgers made with locally sourced ingredients and house-made sauces.',
    openingHours: {
      'Monday': '11:00 AM - 9:00 PM',
      'Tuesday': '11:00 AM - 9:00 PM',
      'Wednesday': '11:00 AM - 9:00 PM',
      'Thursday': '11:00 AM - 9:00 PM',
      'Friday': '11:00 AM - 10:00 PM',
      'Saturday': '11:00 AM - 10:00 PM',
      'Sunday': '12:00 PM - 8:00 PM'
    },
    coordinates: { lat: 40.7505, lng: -73.9934 }
  },
  {
    id: '5',
    name: 'Dragon Hotpot',
    cuisine: 'Chinese',
    rating: 4.5,
    priceRange: '$$',
    distance: 1.5,
    address: '654 Dragon Way, Chinatown',
    phone: '+1 (555) 567-8901',
    image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Traditional Chinese hotpot with premium ingredients and authentic broths.',
    openingHours: {
      'Monday': '5:00 PM - 12:00 AM',
      'Tuesday': '5:00 PM - 12:00 AM',
      'Wednesday': '5:00 PM - 12:00 AM',
      'Thursday': '5:00 PM - 12:00 AM',
      'Friday': '5:00 PM - 1:00 AM',
      'Saturday': '12:00 PM - 1:00 AM',
      'Sunday': '12:00 PM - 11:00 PM'
    },
    coordinates: { lat: 40.7150, lng: -73.9973 }
  },
  {
    id: '6',
    name: 'Café Luna',
    cuisine: 'Cafe',
    rating: 4.3,
    priceRange: '$',
    distance: 0.6,
    address: '987 Coffee St, Arts District',
    phone: '+1 (555) 678-9012',
    image: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Cozy café serving specialty coffee, pastries, and light meals in a relaxed atmosphere.',
    openingHours: {
      'Monday': '7:00 AM - 6:00 PM',
      'Tuesday': '7:00 AM - 6:00 PM',
      'Wednesday': '7:00 AM - 6:00 PM',
      'Thursday': '7:00 AM - 6:00 PM',
      'Friday': '7:00 AM - 8:00 PM',
      'Saturday': '8:00 AM - 8:00 PM',
      'Sunday': '8:00 AM - 5:00 PM'
    },
    coordinates: { lat: 40.7282, lng: -73.9942 }
  },
  {
    id: '7',
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    rating: 4.1,
    priceRange: '$',
    distance: 0.9,
    address: '135 Salsa Street, Mission District',
    phone: '+1 (555) 789-0123',
    image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Vibrant Mexican restaurant with fresh ingredients and bold flavors.',
    openingHours: {
      'Monday': '11:00 AM - 9:00 PM',
      'Tuesday': '11:00 AM - 9:00 PM',
      'Wednesday': '11:00 AM - 9:00 PM',
      'Thursday': '11:00 AM - 9:00 PM',
      'Friday': '11:00 AM - 10:00 PM',
      'Saturday': '10:00 AM - 10:00 PM',
      'Sunday': '10:00 AM - 8:00 PM'
    },
    coordinates: { lat: 40.7411, lng: -73.9897 }
  },
  {
    id: '8',
    name: 'Mediterranean Breeze',
    cuisine: 'Mediterranean',
    rating: 4.8,
    priceRange: '$$$',
    distance: 1.1,
    address: '246 Olive Grove, Harbor View',
    phone: '+1 (555) 890-1234',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Fresh Mediterranean cuisine with an emphasis on healthy, flavorful dishes.',
    openingHours: {
      'Monday': '11:00 AM - 9:30 PM',
      'Tuesday': '11:00 AM - 9:30 PM',
      'Wednesday': '11:00 AM - 9:30 PM',
      'Thursday': '11:00 AM - 9:30 PM',
      'Friday': '11:00 AM - 10:30 PM',
      'Saturday': '11:00 AM - 10:30 PM',
      'Sunday': '11:00 AM - 9:00 PM'
    },
    coordinates: { lat: 40.7336, lng: -74.0027 }
  }
];

export const cuisineTypes = [
  'All', 'Japanese', 'Italian', 'Indian', 'American', 'Chinese', 
  'Cafe', 'Mexican', 'Mediterranean', 'Thai', 'Korean', 'French'
];

export const priceRanges = ['$', '$$', '$$$', '$$$$'];