import React, { useContext } from 'react';
import classNames from 'classnames';
import { CardContainerProps, WeatherCardProps } from '../types';
import { Link } from 'react-router-dom';
import { stateContext } from '../store/store';
import { useWeatherCardState } from '../hooks/useWeatherCardState';
import { getIconUrl } from '../utils';

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className = 'bg-gray-200'
}) => {
  const cardClass = classNames(
    'h-64 m-2 p-2 rounded shadow-md w-64',
    className
  );

  return <div className={cardClass}>{children}</div>;
};

const AddLocationCard: React.FC = () => {
  return (
    <CardContainer>
      <div>hej</div>
      <Link to="/add-location">
        <button>dodaj</button>
      </Link>
    </CardContainer>
  );
};

const WeatherCard: React.FC<WeatherCardProps> = ({ savedLocation }) => {
  const { weatherInfo } = useWeatherCardState(savedLocation); // TODO replace with lat and lon?

  function render() {
    return (
      <CardContainer className="bg-green-200">
        <div className="h-full flex flex-col text-center py-2">
          <p>{savedLocation.name}</p>
          <div className="flex-1 flex items-center justify-center">
            <img
              src={weatherInfo?.icon ? getIconUrl(weatherInfo.icon) : ''}
              alt="weather icon"
            />
          </div>
          <p className="text-xl">
            {weatherInfo?.temp.toFixed(0)}°C {weatherInfo?.sky}
          </p>
          <p className="pt-2">
            min temp: {weatherInfo?.temp_min.toFixed(0)}°C | max temp:{' '}
            {weatherInfo?.temp_max.toFixed(0)}°C
          </p>
        </div>
      </CardContainer>
    );
  }

  return render();
};

export const WeatherCards: React.FC = () => {
  const [state] = useContext(stateContext);
  const { savedLocations } = state;

  function displayCards() {
    return savedLocations.map(savedLocation => (
      <WeatherCard key={savedLocation.id} savedLocation={savedLocation} />
    ));
  }

  return (
    <div className="flex flex-wrap justify-center">
      {displayCards()}
      <AddLocationCard />
    </div>
  );
};
