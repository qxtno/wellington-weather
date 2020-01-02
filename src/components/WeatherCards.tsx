import React, { useContext } from 'react';
import classNames from 'classnames';
import { CardContainerProps, WeatherCardProps } from '../types';
import { Link } from 'react-router-dom';
import { stateContext } from '../store/store';
import { useWeatherCardState } from '../hooks/useWeatherCardState';
import { getIconUrl } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className = 'bg-gray-200'
}) => {
  const cardClass = classNames('h-64 m-2 rounded shadow-md w-64', className);

  return <div className={cardClass}>{children}</div>;
};

const AddLocationCard: React.FC = () => {
  return (
    <CardContainer>
      <Link to="/add-location">
        <div className="flex h-full items-center justify-center text-6xl text-green-300">
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </Link>
    </CardContainer>
  );
};

const WeatherCard: React.FC<WeatherCardProps> = ({ savedLocation }) => {
  const { weatherInfo } = useWeatherCardState(savedLocation);

  function format(temp: number | undefined) {
    return `${temp?.toFixed(0)}°C`;
  }

  function render() {
    return (
      <CardContainer className="bg-green-200">
        <div className="h-full flex flex-col text-center px-2 py-4">
          <p>{savedLocation.name}</p>
          <div className="flex-1 flex items-center justify-center">
            <img
              src={weatherInfo?.icon ? getIconUrl(weatherInfo.icon) : ''}
              alt="weather icon"
            />
          </div>
          <p className="text-xl">
            {format(weatherInfo?.temp)} {weatherInfo?.sky}
          </p>
          <p className="pt-2">
            min temp: {format(weatherInfo?.temp_min)} | max temp:{' '}
            {format(weatherInfo?.temp_max)}
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
