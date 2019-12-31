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

const WeatherCard: React.FC<WeatherCardProps> = ({ locationId }) => {
  // const weatherInfo =
  const { cityName } = useWeatherCardState(locationId);

  function render() {
    return (
      <CardContainer>
        hej moje id: {locationId}
        <div>city name:{cityName}</div>
      </CardContainer>
    );
  }

  return render();
};

export const WeatherCards: React.FC = () => {
  const [state] = useContext(stateContext);
  const { saveLocationIds } = state;

  function displayCards() {
    return saveLocationIds.map(locationId => (
      <WeatherCard key={locationId} locationId={locationId} />
    ));
  }

  return (
    <div className="flex flex-wrap justify-center">
      {displayCards()}
      <AddLocationCard />
    </div>
  );
};
