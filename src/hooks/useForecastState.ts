import { useDispatch, useAppState } from '../store/store';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  SavedForecastInfo,
  SavedLocation,
  ForecastInfo,
  FetchForecastResponse,
  ForecastResponseJson,
  SavedForecastInfoIndex
} from '../types';
import { timeInLastPeriod, HOUR_MILLISECONDS, buildApiUrl } from '../utils';

async function fetchForecast(sLocation: SavedLocation) {
  console.warn('fetch forecast');
  const json: FetchForecastResponse = {
    error: undefined,
    savedForecastInfo: undefined
  };
  try {
    const dataURL = buildApiUrl(
      `/forecast?lat=${sLocation.lat}&lon=${sLocation.lon}`
    );
    const response = await fetch(dataURL);
    const forecastResponseJson: ForecastResponseJson = await response.json();
    if (forecastResponseJson.cod !== '200') {
      // eslint-disable-next-line no-throw-literal
      throw forecastResponseJson.message || 'Error';
    } else {
      json.savedForecastInfo = {
        fetchTime: Date.now(),
        forecastInfos: forecastResponseJson.list.map((value: any) => {
          return {
            dt: value.dt * 1000,
            icon: value.weather[0].icon,
            sky: value.weather[0].main,
            temp: value.main.temp,
            temp_max: value.main.temp_max,
            temp_min: value.main.temp_min
          } as ForecastInfo;
        })
      };
    }
    console.warn('forecast', forecastResponseJson);
  } catch (error) {
    json.error = error;
  }

  return json;
}

async function getForecast(
  savedLocation: SavedLocation,
  id: number,
  savedForecasts: SavedForecastInfoIndex
) {
  let result: FetchForecastResponse = {
    error: undefined,
    savedForecastInfo: undefined
  };

  function hasValidCacheData() {
    const fetchDateMilliseconds = savedForecasts[id]?.fetchTime ?? null;
    if (
      fetchDateMilliseconds != null &&
      timeInLastPeriod({
        time: fetchDateMilliseconds,
        periodDuration: HOUR_MILLISECONDS
      })
    ) {
      return true;
    }
    return false;
  }

  if (hasValidCacheData()) {
    console.log('forecast exist in cache');
    result.savedForecastInfo = savedForecasts[id];
  } else {
    result = { ...(await fetchForecast(savedLocation)) };
    console.log('data from forecast', result);
  }
  return result;
}

export function useForecastState() {
  const { id: id_str } = useParams();
  const id = isNaN(Number.parseInt(id_str ?? ''))
    ? undefined
    : Number.parseInt(id_str ?? '');
  const { savedLocations, savedForecasts } = useAppState();
  const dispatch = useDispatch();
  const savedLocation = savedLocations.find(location => location.id === id);
  const [savedForecast, setSavedForecast] = useState<SavedForecastInfo>();
  const [error, setError] = useState('');

  useEffect(() => {
    async function processForecast() {
      if (savedLocation != null && id != null) {
        const { error, savedForecastInfo } = await getForecast(
          savedLocation,
          id,
          savedForecasts
        );
        if (savedForecastInfo) {
          setSavedForecast(savedForecastInfo);
          dispatch({
            type: 'SET_FORECAST_INFO',
            payload: {
              locationId: id,
              savedForecastInfo: savedForecastInfo
            }
          });
        } else if (error) {
          setError(error);
        }
      }
    }
    processForecast();
  }, [dispatch, id, savedForecasts, savedLocation]);

  return { error, forecastInfos: savedForecast?.forecastInfos, savedLocation };
}
