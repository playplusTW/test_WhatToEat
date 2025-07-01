import React from 'react';
import { Bookmark, Heart } from 'lucide-react';
import { Restaurant } from '../types';
import { RestaurantCard } from './RestaurantCard';

interface BookmarksListProps {
  bookmarks: Restaurant[];
  onBookmark: (restaurant: Restaurant) => void;
  isBookmarked: (id: string) => boolean;
}

export const BookmarksList: React.FC<BookmarksListProps> = ({
  bookmarks,
  onBookmark,
  isBookmarked
}) => {
  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleGetDirections = (restaurant: Restaurant) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`;
    window.open(url, '_blank');
  };

  if (bookmarks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-12">
            <Heart size={64} className="mx-auto text-pink-300 dark:text-pink-600 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Bookmarks Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start exploring restaurants and bookmark your favorites to see them here.
            </p>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-lg">
              <Bookmark size={16} />
              <span className="text-sm">Tap the bookmark icon on any restaurant card</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Bookmark size={16} className="text-pink-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {bookmarks.length} Saved Restaurant{bookmarks.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Bookmarks
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Your collection of favorite restaurants
          </p>
        </div>

        <div className="space-y-6">
          {bookmarks.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isBookmarked={isBookmarked(restaurant.id)}
              onBookmark={onBookmark}
              onCall={handleCall}
              onGetDirections={handleGetDirections}
            />
          ))}
        </div>
      </div>
    </div>
  );
};