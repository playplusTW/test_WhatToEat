import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { HomePage } from './components/HomePage';
import { FilterModal } from './components/FilterModal';
import { BookmarksList } from './components/BookmarksList';
import { HistoryList } from './components/HistoryList';
import { MapView } from './components/MapView';
import { RestaurantCard } from './components/RestaurantCard';
import { useGeolocation } from './hooks/useGeolocation';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Restaurant, UserPreferences, ViewMode } from './types';

const defaultPreferences: UserPreferences = {
  cuisineTypes: [],
  priceRange: [],
  maxDistance: 5,
  minRating: 0
};

function App() {
  const [activeView, setActiveView] = useState<ViewMode>('home');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  
  const { location: userLocation, getCurrentLocation } = useGeolocation();
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('preferences', defaultPreferences);
  const [bookmarks, setBookmarks] = useLocalStorage<Restaurant[]>('bookmarks', []);
  const [history, setHistory] = useLocalStorage<Restaurant[]>('history', []);

  const handleBookmark = useCallback((restaurant: Restaurant) => {
    setBookmarks(prev => {
      const isBookmarked = prev.some(b => b.id === restaurant.id);
      if (isBookmarked) {
        return prev.filter(b => b.id !== restaurant.id);
      } else {
        return [...prev, restaurant];
      }
    });
  }, [setBookmarks]);

  const isBookmarked = useCallback((id: string) => {
    return bookmarks.some(b => b.id === id);
  }, [bookmarks]);

  const handleAddToHistory = useCallback((restaurant: Restaurant) => {
    setHistory(prev => [...prev, restaurant]);
  }, [setHistory]);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleGetDirections = (restaurant: Restaurant) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`;
    window.open(url, '_blank');
  };

  const renderContent = () => {
    if (selectedRestaurant) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="mb-6 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              ← 返回地圖
            </button>
            <RestaurantCard
              restaurant={selectedRestaurant}
              isBookmarked={isBookmarked(selectedRestaurant.id)}
              onBookmark={handleBookmark}
              onCall={handleCall}
              onGetDirections={handleGetDirections}
            />
          </div>
        </div>
      );
    }

    switch (activeView) {
      case 'home':
        return (
          <HomePage
            userLocation={userLocation}
            preferences={preferences}
            onBookmark={handleBookmark}
            isBookmarked={isBookmarked}
            onAddToHistory={handleAddToHistory}
          />
        );
      case 'bookmarks':
        return (
          <BookmarksList
            bookmarks={bookmarks}
            onBookmark={handleBookmark}
            isBookmarked={isBookmarked}
          />
        );
      case 'history':
        return (
          <HistoryList
            history={history}
            onBookmark={handleBookmark}
            isBookmarked={isBookmarked}
            onClearHistory={handleClearHistory}
          />
        );
      case 'map':
        return (
          <MapView
            userLocation={userLocation}
            onRestaurantSelect={setSelectedRestaurant}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        onSettingsClick={() => setShowFilters(true)}
        onLocationClick={getCurrentLocation}
        userLocation={userLocation}
      />
      
      <main className="pb-20">
        {renderContent()}
      </main>

      <BottomNavigation
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
          setSelectedRestaurant(null);
          if (view === 'filters') {
            setShowFilters(true);
          }
        }}
        bookmarkCount={bookmarks.length}
        historyCount={history.filter((restaurant, index, self) => 
          index === self.findIndex(r => r.id === restaurant.id)
        ).length}
      />

      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        preferences={preferences}
        onUpdatePreferences={setPreferences}
      />
    </div>
  );
}

export default App;