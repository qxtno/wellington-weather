import { useState, useEffect } from 'react';
import { buildApiUrl, timeInLastPeriod, HOUR_MILLISECONDS } from '../utils';
import { SavedLocation, WeatherInfo, WeatherResponseJson } from '../types';
import { useDispatch } from '../store/store';

export function useWeatherCardState(savedLocation: SavedLocation) {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>();
  const dispatch = useDispatch();

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
          icon: json.weather[0].icon,
          fetchTime: Date.now()
        });
      } catch (error) {
        // hasError = true;
      }
    }

    const fetchDateMilliseconds = savedLocation.weatherInfo?.fetchTime ?? null;
    if (
      fetchDateMilliseconds != null &&
      timeInLastPeriod({
        time: fetchDateMilliseconds,
        periodDuration: HOUR_MILLISECONDS
      })
    ) {
      setWeatherInfo(savedLocation.weatherInfo);
    } else {
      fetchWeather();
    }
  }, [savedLocation.lat, savedLocation.lon, savedLocation.weatherInfo]);

  useEffect(() => {
    if (weatherInfo) {
      console.log('set weather info');
      dispatch({
        type: 'SET_WEATHER_INFO',
        payload: {
          locationId: savedLocation.id,
          weatherInfo: weatherInfo
        }
      });
    }
  }, [dispatch, savedLocation.id, weatherInfo]);

  return { weatherInfo };
}
