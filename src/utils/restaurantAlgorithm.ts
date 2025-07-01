import { Restaurant, UserPreferences, UserLocation, WeatherCondition } from '../types';

export const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
};

export const getWeatherWeights = (weather: WeatherCondition | null) => {
  if (!weather) return {};
  
  const weights: { [cuisine: string]: number } = {};
  
  // Hot weather preferences
  if (weather.temp > 25) {
    weights['Mediterranean'] = 1.3;
    weights['Cafe'] = 1.2;
    weights['Chinese'] = 0.8; // Less hotpot in hot weather
  }
  
  // Cold weather preferences
  if (weather.temp < 10) {
    weights['Chinese'] = 1.4; // More hotpot in cold weather
    weights['Indian'] = 1.2;
    weights['Cafe'] = 1.1;
  }
  
  // Rainy weather
  if (weather.main.toLowerCase().includes('rain')) {
    weights['Chinese'] = 1.5; // Hotpot for rainy days
    weights['Indian'] = 1.3;
    weights['Cafe'] = 1.2;
  }
  
  return weights;
};

export const getTimeWeights = (timeOfDay: string) => {
  const weights: { [cuisine: string]: number } = {};
  
  switch (timeOfDay) {
    case 'morning':
      weights['Cafe'] = 2.0;
      weights['American'] = 1.3;
      break;
    case 'afternoon':
      weights['Cafe'] = 1.2;
      weights['Mediterranean'] = 1.1;
      break;
    case 'evening':
      weights['Italian'] = 1.2;
      weights['Japanese'] = 1.1;
      weights['Chinese'] = 1.1;
      break;
    case 'night':
      weights['Chinese'] = 1.3;
      weights['Korean'] = 1.2;
      break;
  }
  
  return weights;
};

export const calculateDistance = (
  userLocation: UserLocation,
  restaurantLocation: { lat: number; lng: number }
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (restaurantLocation.lat - userLocation.lat) * Math.PI / 180;
  const dLng = (restaurantLocation.lng - userLocation.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(userLocation.lat * Math.PI / 180) * 
    Math.cos(restaurantLocation.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const filterRestaurants = (
  restaurants: Restaurant[],
  preferences: UserPreferences,
  userLocation: UserLocation | null
): Restaurant[] => {
  return restaurants.filter(restaurant => {
    // Cuisine filter
    if (preferences.cuisineTypes.length > 0 && 
        !preferences.cuisineTypes.includes('All') &&
        !preferences.cuisineTypes.includes(restaurant.cuisine)) {
      return false;
    }
    
    // Price range filter
    if (preferences.priceRange.length > 0 && 
        !preferences.priceRange.includes(restaurant.priceRange)) {
      return false;
    }
    
    // Rating filter
    if (restaurant.rating < preferences.minRating) {
      return false;
    }
    
    // Distance filter
    if (userLocation) {
      const distance = calculateDistance(userLocation, restaurant.coordinates);
      if (distance > preferences.maxDistance) {
        return false;
      }
    }
    
    return true;
  });
};

export const getRandomRestaurant = (
  restaurants: Restaurant[],
  preferences: UserPreferences,
  userLocation: UserLocation | null,
  weather: WeatherCondition | null,
  excludeIds: string[] = []
): Restaurant | null => {
  const filtered = filterRestaurants(restaurants, preferences, userLocation)
    .filter(r => !excludeIds.includes(r.id));
  
  if (filtered.length === 0) return null;
  
  const timeOfDay = getTimeOfDay();
  const weatherWeights = getWeatherWeights(weather);
  const timeWeights = getTimeWeights(timeOfDay);
  
  // Calculate weighted scores
  const weightedRestaurants = filtered.map(restaurant => {
    let weight = 1;
    
    // Apply weather weights
    if (weatherWeights[restaurant.cuisine]) {
      weight *= weatherWeights[restaurant.cuisine];
    }
    
    // Apply time weights
    if (timeWeights[restaurant.cuisine]) {
      weight *= timeWeights[restaurant.cuisine];
    }
    
    // Apply rating boost
    weight *= (restaurant.rating / 5);
    
    // Apply distance penalty
    if (userLocation) {
      const distance = calculateDistance(userLocation, restaurant.coordinates);
      weight *= Math.max(0.1, 1 - (distance / preferences.maxDistance));
    }
    
    return { restaurant, weight };
  });
  
  // Weighted random selection
  const totalWeight = weightedRestaurants.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const item of weightedRestaurants) {
    random -= item.weight;
    if (random <= 0) {
      return item.restaurant;
    }
  }
  
  return filtered[Math.floor(Math.random() * filtered.length)];
};