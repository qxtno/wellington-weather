import React from 'react';
import { WeatherCard } from './WeatherCards';
import { useForecastState } from '../hooks/useForecastState';

export const Forecast: React.FC = () => {
  const { error, forecastInfos, savedLocation } = useForecastState();

  return (
    <div>
      <div className="flex justify-center">
        {savedLocation && <WeatherCard savedLocation={savedLocation} />}
      </div>
      <div>
        TODO: Forecast
        <div>
          {forecastInfos?.map(wi => {
            return (
              <div key={wi.dt}>
                <div>id: {wi.dt}</div>
                {wi.temp}
              </div>
            );
          })}
        </div>
        {error}
      </div>
    </div>
  );
};
