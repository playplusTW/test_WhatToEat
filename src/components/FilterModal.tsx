import React, { useState } from 'react';
import { X, Sliders } from 'lucide-react';
import { UserPreferences } from '../types';
import { cuisineTypes, priceRanges } from '../data/mockRestaurants';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onUpdatePreferences: (preferences: UserPreferences) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences
}) => {
  const [localPreferences, setLocalPreferences] = useState<UserPreferences>(preferences);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdatePreferences(localPreferences);
    onClose();
  };

  const handleReset = () => {
    const defaultPreferences: UserPreferences = {
      cuisineTypes: [],
      priceRange: [],
      maxDistance: 5,
      minRating: 0
    };
    setLocalPreferences(defaultPreferences);
  };

  const toggleCuisine = (cuisine: string) => {
    if (cuisine === '全部') {
      setLocalPreferences(prev => ({
        ...prev,
        cuisineTypes: prev.cuisineTypes.includes('全部') ? [] : ['全部']
      }));
    } else {
      setLocalPreferences(prev => ({
        ...prev,
        cuisineTypes: prev.cuisineTypes.includes('全部')
          ? [cuisine]
          : prev.cuisineTypes.includes(cuisine)
            ? prev.cuisineTypes.filter(c => c !== cuisine)
            : [...prev.cuisineTypes.filter(c => c !== '全部'), cuisine]
      }));
    }
  };

  const togglePriceRange = (price: string) => {
    setLocalPreferences(prev => ({
      ...prev,
      priceRange: prev.priceRange.includes(price)
        ? prev.priceRange.filter(p => p !== price)
        : [...prev.priceRange, price]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Sliders className="text-pink-600 dark:text-pink-400" size={24} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              篩選與偏好
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Cuisine Types */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              料理類型
            </h3>
            <div className="flex flex-wrap gap-2">
              {cuisineTypes.map(cuisine => (
                <button
                  key={cuisine}
                  onClick={() => toggleCuisine(cuisine)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    localPreferences.cuisineTypes.includes(cuisine)
                      ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-2 border-pink-300 dark:border-pink-600'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              價格區間
            </h3>
            <div className="flex space-x-2">
              {priceRanges.map(price => (
                <button
                  key={price}
                  onClick={() => togglePriceRange(price)}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    localPreferences.priceRange.includes(price)
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-2 border-green-300 dark:border-green-600'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {price}
                </button>
              ))}
            </div>
          </div>

          {/* Max Distance */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              最大距離：{localPreferences.maxDistance}公里
            </h3>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={localPreferences.maxDistance}
              onChange={(e) => setLocalPreferences(prev => ({
                ...prev,
                maxDistance: parseFloat(e.target.value)
              }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0.5公里</span>
              <span>10公里</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              最低評分：{localPreferences.minRating}/5
            </h3>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={localPreferences.minRating}
              onChange={(e) => setLocalPreferences(prev => ({
                ...prev,
                minRating: parseFloat(e.target.value)
              }))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>不限</span>
              <span>5 星</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            重設
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all font-medium"
          >
            套用篩選
          </button>
        </div>
      </div>
    </div>
  );
};