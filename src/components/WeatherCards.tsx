import React, { useContext } from 'react';
import classNames from 'classnames';
import { CardContainerProps, WeatherCardProps } from '../types';
import { Link } from 'react-router-dom';
import { stateContext } from '../store/store';
import { useWeatherCardState } from '../hooks/useWeatherCardState';

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
  // const weatherInfo =
  const { cityName } = useWeatherCardState(savedLocation); // TODO replace with lat and lon?

  function render() {
    return (
      <CardContainer>
        <div>{savedLocation.name}</div>
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
