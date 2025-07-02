import { useState, useEffect } from 'react';
import { UserLocation } from '../types';

export const useGeolocation = () => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('此瀏覽器不支援定位功能');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        setLoading(false);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('使用者拒絕存取定位');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('無法取得定位資訊');
            break;
          case error.TIMEOUT:
            setError('取得定位逾時');
            break;
          default:
            setError('發生未知錯誤');
            break;
        }
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return { location, error, loading, getCurrentLocation };
};