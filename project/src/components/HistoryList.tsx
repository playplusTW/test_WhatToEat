import React from 'react';
import { History, Clock } from 'lucide-react';
import { Restaurant } from '../types';
import { RestaurantCard } from './RestaurantCard';

interface HistoryListProps {
  history: Restaurant[];
  onBookmark: (restaurant: Restaurant) => void;
  isBookmarked: (id: string) => boolean;
  onClearHistory: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onBookmark,
  isBookmarked,
  onClearHistory
}) => {
  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleGetDirections = (restaurant: Restaurant) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`;
    window.open(url, '_blank');
  };

  if (history.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-12">
            <Clock size={64} className="mx-auto text-blue-300 dark:text-blue-600 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No History Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start discovering restaurants and they'll appear here for future reference.
            </p>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg">
              <History size={16} />
              <span className="text-sm">Use "Surprise Me!" to start building your history</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Remove duplicates and reverse to show most recent first
  const uniqueHistory = history.filter((restaurant, index, self) => 
    index === self.findIndex(r => r.id === restaurant.id)
  ).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <History size={16} className="text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {uniqueHistory.length} Recent Suggestion{uniqueHistory.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your History
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Recently suggested restaurants
          </p>

          <button
            onClick={onClearHistory}
            className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            Clear History
          </button>
        </div>

        <div className="space-y-6">
          {uniqueHistory.map((restaurant) => (
            <RestaurantCard
              key={`${restaurant.id}-history`}
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