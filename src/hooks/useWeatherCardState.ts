import { useState, useEffect } from 'react';
import { buildApiUrl } from '../utils';
import { SavedLocation, WeatherInfo, WeatherResponseJson } from '../types';

export function useWeatherCardState(savedLocation: SavedLocation) {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>();

  useEffect(() => {
    async function fetchWeather() {
      try {
        const dataURL = buildApiUrl(
          `/weather?lat=${savedLocation.lat}&lon=${savedLocation.lon}`
        );
        const response = await fetch(dataURL);
        const json: WeatherResponseJson = await response.json();
        console.warn('weather', json);

        setWeatherInfo({
          sky: json.weather[0].main,
          temp: json.main.temp,
          temp_max: json.main.temp_max,
          temp_min: json.main.temp_min,
          icon: json.weather[0].icon
        });
      } catch (error) {
        // hasError = true;
      }
    }
    fetchWeather();
  }, [savedLocation.lat, savedLocation.lon]);

  return { weatherInfo };
}
