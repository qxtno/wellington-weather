import React from 'react';
import { WeatherCard } from './WeatherCards';
import { useForecastState } from '../hooks/useForecastState';
import classNames from 'classnames';
import { getIconUrl, formatToCelsius } from '../utils';
import { useAppState } from '../store/store';

export const Forecast: React.FC = () => {
  const { error, forecastInfos, savedLocation } = useForecastState();
  const { darkTheme } = useAppState();

  const forecastHeaderClassList = classNames(
    'flex justify-center pb-2 text-2xl',
    { 'text-white': darkTheme },
    { 'text-gray-800': !darkTheme }
  );
  const forecastCardClassList = classNames(
    'h-64 w-64 flex flex-col text-center px-4 py-4 rounded',
    { 'bg-blue-600 text-white': darkTheme },
    { 'bg-blue-200': !darkTheme }
  );

  return (
    <div>
      <div className="flex justify-center">
        {savedLocation && <WeatherCard savedLocation={savedLocation} />}
      </div>
      <div>
        <p className={forecastHeaderClassList}>Forecast:</p>
        <div className="flex overflow-auto">
          {forecastInfos?.map((forecastInfo, index) => {
            const itemClassList = classNames({ 'pl-2': index !== 0 });
            const forecastDt = new Date(forecastInfo.dt);
            const dateTimeString =
              ('0' + forecastDt.getHours()).slice(-2) +
              ':' +
              ('0' + forecastDt.getMinutes()).slice(-2) +
              ' ' +
              ('0' + forecastDt.getDate()).slice(-2) +
              '.' +
              ('0' + (forecastDt.getMonth() + 1)).slice(-2);

            return (
              <div key={forecastInfo.dt} className={itemClassList}>
                <div className={forecastCardClassList}>
                  <p>{dateTimeString}</p>
                  <div className="flex-1 flex items-center justify-center">
                    <img
                      src={
                        forecastInfo?.icon ? getIconUrl(forecastInfo.icon) : ''
                      }
                      alt="weather icon"
                    />
                  </div>
                  <p className="text-xl">
                    {formatToCelsius(forecastInfo?.temp)} {forecastInfo?.sky}
                  </p>
                  <p className="pt-2 whitespace-no-wrap">
                    min temp: {formatToCelsius(forecastInfo?.temp_min)} | max
                    temp: {formatToCelsius(forecastInfo?.temp_max)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {error}
      </div>
    </div>
  );
};
