import React from 'react';
import { Home, Filter, Bookmark, History, Map } from 'lucide-react';
import { ViewMode } from '../types';

interface BottomNavigationProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  bookmarkCount: number;
  historyCount: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeView,
  onViewChange,
  bookmarkCount,
  historyCount
}) => {
  const navItems = [
    { id: 'home' as ViewMode, icon: Home, label: '首頁' },
    { id: 'filters' as ViewMode, icon: Filter, label: '篩選' },
    { id: 'map' as ViewMode, icon: Map, label: '地圖' },
    { id: 'bookmarks' as ViewMode, icon: Bookmark, label: '收藏', badge: bookmarkCount },
    { id: 'history' as ViewMode, icon: History, label: '歷史', badge: historyCount }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ id, icon: Icon, label, badge }) => (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={`relative flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                activeView === id
                  ? 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{label}</span>
              {badge !== undefined && badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {badge > 99 ? '99+' : badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};