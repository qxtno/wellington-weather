import React from 'react';
import { Link } from 'react-router-dom';

export const Nav: React.FC = () => {
  function render() {
    return (
      <div className="flex justify-center items-center h-full">
        <Link to="/">Home</Link>
      </div>
    );
  }
  return render();
};
