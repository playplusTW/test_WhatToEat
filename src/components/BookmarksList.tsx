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
              尚未收藏任何餐廳
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              開始探索餐廳並將喜愛的加入收藏，之後會顯示在這裡。
            </p>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-lg">
              <Bookmark size={16} />
              <span className="text-sm">在餐廳卡片上點擊收藏圖示</span>
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
              已收藏 {bookmarks.length} 家餐廳
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            我的收藏
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            你收藏的餐廳
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