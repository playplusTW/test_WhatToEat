import React from 'react';
import { Map, MapPin, Navigation } from 'lucide-react';
import { Restaurant, UserLocation } from '../types';
import { mockRestaurants } from '../data/mockRestaurants';

interface MapViewProps {
  userLocation: UserLocation | null;
  onRestaurantSelect: (restaurant: Restaurant) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  userLocation,
  onRestaurantSelect
}) => {
  const getCuisineColor = (cuisine: string) => {
    const colors = {
      'Japanese': 'bg-red-500',
      'Italian': 'bg-green-500',
      'Indian': 'bg-orange-500',
      'American': 'bg-blue-500',
      'Chinese': 'bg-yellow-500',
      'Cafe': 'bg-purple-500',
      'Mexican': 'bg-pink-500',
      'Mediterranean': 'bg-teal-500'
    };
    return colors[cuisine as keyof typeof colors] || 'bg-gray-500';
  };

  const getDistanceFromUser = (restaurant: Restaurant) => {
    if (!userLocation) return null;
    
    const R = 6371; // Earth's radius in km
    const dLat = (restaurant.coordinates.lat - userLocation.lat) * Math.PI / 180;
    const dLng = (restaurant.coordinates.lng - userLocation.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(userLocation.lat * Math.PI / 180) * 
      Math.cos(restaurant.coordinates.lat * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const sortedRestaurants = userLocation 
    ? [...mockRestaurants].sort((a, b) => {
        const distA = getDistanceFromUser(a) || Infinity;
        const distB = getDistanceFromUser(b) || Infinity;
        return distA - distB;
      })
    : mockRestaurants;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Map size={16} className="text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {sortedRestaurants.length} Restaurants Nearby
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Restaurant Map
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore all available restaurants in your area
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 flex items-center justify-center relative">
            <div className="text-center">
              <Map size={48} className="mx-auto text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Interactive Map View
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                In a real implementation, this would show an interactive map with restaurant locations
              </p>
            </div>
            
            {/* Mock Map Pins */}
            <div className="absolute top-12 left-16">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                <MapPin size={14} className="text-white" />
              </div>
            </div>
            <div className="absolute top-20 right-20">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce delay-100">
                <MapPin size={14} className="text-white" />
              </div>
            </div>
            <div className="absolute bottom-16 left-1/3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-bounce delay-200">
                <MapPin size={14} className="text-white" />
              </div>
            </div>
            {userLocation && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse">
                  <div className="w-8 h-8 bg-blue-200 rounded-full absolute -top-2 -left-2 animate-ping"></div>
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400 absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  You
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Restaurant List */}
        <div className="space-y-4">
          {sortedRestaurants.map((restaurant) => {
            const distance = getDistanceFromUser(restaurant);
            return (
              <div
                key={restaurant.id}
                onClick={() => onRestaurantSelect(restaurant)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${getCuisineColor(restaurant.cuisine)} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <MapPin size={20} className="text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {restaurant.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {restaurant.cuisine} • {restaurant.priceRange}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                          <span className="text-sm font-medium">{restaurant.rating}</span>
                          <span>★</span>
                        </div>
                        {distance && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {distance.toFixed(1)}km away
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                      <MapPin size={14} className="mr-1" />
                      <span className="truncate">{restaurant.address}</span>
                    </div>
                  </div>
                  
                  <Navigation size={20} className="text-gray-400 flex-shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};