import React from 'react';
import classNames from 'classnames';
import { CardContainerProps } from '../types';
import { Link } from 'react-router-dom';

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

export const WeatherCards: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center my-2">
      <AddLocationCard />
      <AddLocationCard />
      <AddLocationCard />
      <AddLocationCard />
      <AddLocationCard />
      <AddLocationCard />
      <AddLocationCard />
    </div>
  );
};
