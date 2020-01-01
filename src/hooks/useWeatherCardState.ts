import { useState, useEffect } from 'react';
import { buildApiUrl } from '../utils';
import { SavedLocation } from '../types';

export function useWeatherCardState(savedLocation: SavedLocation) {
  // api.openweathermap.org/data/2.5/weather?id=2172797

  const [cityName, setCityName] = useState('name?');

  useEffect(() => {
    async function fetchWeather() {
      try {
        const dataURL = buildApiUrl(
          `/weather?lat=${savedLocation.lat}&lon=${savedLocation.lon}`
        );
        const response = await fetch(dataURL);
        const json = await response.json();
        console.warn('weather', json);
      } catch (error) {
        // hasError = true;
      }
    }
    fetchWeather();
  }, [savedLocation.lat, savedLocation.lon]);

  return { cityName };
}
