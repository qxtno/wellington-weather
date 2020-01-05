import React from 'react';
import { useAppState, useDispatch } from '../store/store';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const DeleteSavedLocation: React.FC = () => {
  const { savedLocations } = useAppState();
  const dispatch = useDispatch();

  function removeLocation(id: number) {
    dispatch({ type: 'REMOVE_LOCATION', payload: { locationId: id } });
  }

  return (
    <div>
      {savedLocations?.map((item, index) => {
        const evenOdd = index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100';
        const itemClass = classNames('px-2 py-1 flex rounded', evenOdd);

        return (
          <div key={item.id} className={itemClass}>
            <div>{item.name}</div>
            <div className="px-2 flex-1"></div>
            <div>
              <button
                onClick={() => removeLocation(item.id)}
                title="Remove location"
                className="bg-red-500 hover:bg-red-600 text-gray-800 text-center rounded w-8"
              >
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
