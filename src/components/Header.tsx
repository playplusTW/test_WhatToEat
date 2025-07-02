import React from 'react';
import { Moon, Sun, Settings, MapPin } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

interface HeaderProps {
  onSettingsClick: () => void;
  onLocationClick: () => void;
  userLocation: any;
}

export const Header: React.FC<HeaderProps> = ({
  onSettingsClick,
  onLocationClick,
  userLocation
}) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍽️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                今天吃什麼
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                輕鬆決定餐點
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onLocationClick}
              className={`p-2 rounded-lg transition-colors ${
                userLocation 
                  ? 'text-green-600 bg-green-50 dark:bg-green-900/20' 
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
              title={userLocation ? '已取得位置' : '點擊以啟用定位'}
            >
              <MapPin size={20} />
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="切換主題"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={onSettingsClick}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="設定"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};