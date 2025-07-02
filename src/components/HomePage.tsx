import React, { useState, useCallback } from 'react';
import { Shuffle, Zap, MapPin, Clock } from 'lucide-react';
import { Restaurant, UserPreferences, UserLocation } from '../types';
import { getRandomRestaurant, getTimeOfDay } from '../utils/restaurantAlgorithm';
import { mockRestaurants } from '../data/mockRestaurants';
import { RestaurantCard } from './RestaurantCard';

interface HomePageProps {
  userLocation: UserLocation | null;
  preferences: UserPreferences;
  onBookmark: (restaurant: Restaurant) => void;
  isBookmarked: (id: string) => boolean;
  onAddToHistory: (restaurant: Restaurant) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  userLocation,
  preferences,
  onBookmark,
  isBookmarked,
  onAddToHistory
}) => {
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [excludedIds, setExcludedIds] = useState<string[]>([]);

  const generateRandomRestaurant = useCallback(async () => {
    setIsGenerating(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const restaurant = getRandomRestaurant(
      mockRestaurants,
      preferences,
      userLocation,
      null, // Weather API would be integrated here
      excludedIds
    );
    
    if (restaurant) {
      setCurrentRestaurant(restaurant);
      setExcludedIds(prev => [...prev, restaurant.id]);
      onAddToHistory(restaurant);
    } else {
      // Reset if no more restaurants available
      setExcludedIds([]);
      const fallbackRestaurant = getRandomRestaurant(
        mockRestaurants,
        preferences,
        userLocation,
        null
      );
      if (fallbackRestaurant) {
        setCurrentRestaurant(fallbackRestaurant);
        onAddToHistory(fallbackRestaurant);
      }
    }
    
    setIsGenerating(false);
  }, [userLocation, preferences, excludedIds, onAddToHistory]);

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleGetDirections = (restaurant: Restaurant) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`;
    window.open(url, '_blank');
  };

  const getTimeGreeting = () => {
    const timeOfDay = getTimeOfDay();
    const greetings = {
      morning: "早安！準備吃早餐嗎？",
      afternoon: "午安！要吃午餐了嗎？",
      evening: "晚安！該吃晚餐囉？",
      night: "夜深了，想吃點宵夜嗎？"
    };
    return greetings[timeOfDay];
  };

  const getLocationStatus = () => {
    if (!userLocation) {
      return {
        icon: MapPin,
        text: "啟用定位以獲得更好建議",
        color: "text-orange-600 dark:text-orange-400"
      };
    }
    return {
      icon: MapPin,
      text: "已取得位置",
      color: "text-green-600 dark:text-green-400"
    };
  };

  const locationStatus = getLocationStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Clock size={16} className="text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {getTimeGreeting()}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            今天吃什麼？
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            讓我們幫你決定！點擊下方按鈕獲得個人化餐廳建議。
          </p>

          <div className="flex items-center justify-center space-x-2 mb-8">
            <locationStatus.icon size={16} className={locationStatus.color} />
            <span className={`text-sm ${locationStatus.color}`}>
              {locationStatus.text}
            </span>
          </div>
        </div>

        {/* Main Action Button */}
        <div className="text-center mb-8">
          <button
            onClick={generateRandomRestaurant}
            disabled={isGenerating}
            className={`group relative inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:from-pink-600 hover:to-orange-600 hover:scale-105 shadow-lg hover:shadow-xl ${
              isGenerating ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>尋找最合適的餐廳...</span>
              </>
            ) : (
              <>
                <Shuffle size={24} />
                <span>給我驚喜</span>
                <Zap size={20} className="group-hover:animate-pulse" />
              </>
            )}
          </button>
        </div>

        {/* Restaurant Result */}
        {currentRestaurant && !isGenerating && (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                覺得這家怎麼樣？
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                根據你的偏好與位置推薦
              </p>
            </div>
            
            <RestaurantCard
              restaurant={currentRestaurant}
              isBookmarked={isBookmarked(currentRestaurant.id)}
              onBookmark={onBookmark}
              onCall={handleCall}
              onGetDirections={handleGetDirections}
            />
            
            <div className="text-center mt-6">
              <button
                onClick={generateRandomRestaurant}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                <Shuffle size={16} />
                <span>換一間看看</span>
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {!currentRestaurant && (
          <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                {mockRestaurants.length}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                間餐廳可選
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                智慧
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                AI 推薦
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};