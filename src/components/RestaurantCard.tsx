import React from 'react';
import { Star, Phone, MapPin, Clock, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isBookmarked: boolean;
  onBookmark: (restaurant: Restaurant) => void;
  onCall?: (phone: string) => void;
  onGetDirections?: (restaurant: Restaurant) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  isBookmarked,
  onBookmark,
  onCall,
  onGetDirections
}) => {
  const getCurrentDayHours = () => {
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const today = days[new Date().getDay()];
    return restaurant.openingHours[today] || '無營業資訊';
  };

  const getPriceRangeColor = (priceRange: string) => {
    switch (priceRange) {
      case '$': return 'text-green-600 dark:text-green-400';
      case '$$': return 'text-yellow-600 dark:text-yellow-400';
      case '$$$': return 'text-orange-600 dark:text-orange-400';
      case '$$$$': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=500';
          }}
        />
        <div className="absolute top-3 right-3">
          <button
            onClick={() => onBookmark(restaurant)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isBookmarked
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm ${getPriceRangeColor(restaurant.priceRange)}`}>
            {restaurant.priceRange}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {restaurant.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {restaurant.cuisine} • 距離 {restaurant.distance} 公里
            </p>
          </div>
          <div className="flex items-center space-x-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
            <Star className="text-yellow-500 fill-current" size={16} />
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
              {restaurant.rating}
            </span>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
          {restaurant.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin size={16} className="mr-2 flex-shrink-0" />
            <span>{restaurant.address}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Clock size={16} className="mr-2 flex-shrink-0" />
            <span>{getCurrentDayHours()}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onCall?.(restaurant.phone)}
            className="flex-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center space-x-2"
          >
            <Phone size={16} />
            <span>撥打電話</span>
          </button>
          
          <button
            onClick={() => onGetDirections?.(restaurant)}
            className="flex-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg font-medium hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors flex items-center justify-center space-x-2"
          >
            <MapPin size={16} />
            <span>導航</span>
          </button>
          
          {restaurant.website && (
            <button
              onClick={() => window.open(restaurant.website, '_blank')}
              className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
            >
              <ExternalLink size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};