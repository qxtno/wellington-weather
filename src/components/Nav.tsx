import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export const Nav: React.FC = () => {
  function render() {
    return (
      <div className="flex justify-center items-center h-full">
        <Link to="/">
          <div className="rounded hover:bg-blue-300 px-4 py-2">
            <span className="pr-2">
              <FontAwesomeIcon className="text-xl" icon={faHome} />
            </span>
            Home
          </div>
        </Link>
      </div>
    );
  }
  return render();
};
