import { useState, useEffect } from 'react';
import { API_KEY } from '../types';

export function useWeatherCardState(locationId: number) {
  // api.openweathermap.org/data/2.5/weather?id=2172797

  const [cityName, setCityName] = useState('name?');

  useEffect(() => {
    async function fetchWeather() {
      try {
        const dataURL =
          'https://api.openweathermap.org/data/2.5/weather?id=' +
          locationId +
          '&APPID=' +
          API_KEY;
        const response = await fetch(dataURL);
        const json = await response.json();
        console.warn('weather', json);
      } catch (error) {
        // hasError = true;
      }
    }
    fetchWeather();
  }, [locationId]);

  return { cityName };
}
