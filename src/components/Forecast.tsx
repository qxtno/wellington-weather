import React from 'react';
import { useParams } from 'react-router-dom';
import { WeatherCard } from './WeatherCards';
import { useAppState } from '../store/store';

export const Forecast: React.FC = props => {
  const { id } = useParams();
  const { savedLocations } = useAppState();
  const saveLocation = savedLocations.find(
    location => location.id === Number(id)
  );

  console.log('props', props, id);
  return (
    <div>
      <div className="flex justify-center">
        {saveLocation && <WeatherCard savedLocation={saveLocation} />}
      </div>
      <div> TODO: Forecast </div>
    </div>
  );
};
