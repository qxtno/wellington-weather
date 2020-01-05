import React, { useRef, useEffect } from 'react';
import { useAddLocationState } from '../hooks/useAddLocationState';
import classNames from 'classnames';
import { useDispatch, useAppState } from '../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

export const AddLocation: React.FC = () => {
  const {
    search,
    setSearch,
    onSearch,
    error,
    searchList,
    isSearching
  } = useAddLocationState();

  const dispatch = useDispatch();
  const { savedLocations, darkTheme } = useAppState();

  const inputClassList = classNames(
    'border flex-1 px-2 rounded min-w-0',
    { 'bg-gray-700 text-white border-gray-600': darkTheme },
    { '': !darkTheme }
  );
  const searchButtonClassList = classNames(
    'rounded ml-2 px-4 p-1 ',
    { 'text-white bg-gray-700 hover:bg-gray-600': darkTheme && !isSearching },
    { 'text-white bg-gray-700': darkTheme && isSearching },
    { 'bg-gray-200 hover:bg-gray-300': !darkTheme && !isSearching },
    { 'bg-gray-200': !darkTheme && isSearching },
    { 'cursor-not-allowed': isSearching }
  );

  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    ref?.current?.focus();
  }, []);

  function searchSection() {
    return (
      <div className="flex max-w-sm mx-auto">
        <input
          ref={ref}
          className={inputClassList}
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => {
            e.key === 'Enter' ? onSearch() : void 0;
          }}
        />
        <button
          className={searchButtonClassList}
          onClick={onSearch}
          disabled={isSearching}
        >
          {isSearching && (
            <span className="pr-2">
              <FontAwesomeIcon icon={faSpinner} spin />
            </span>
          )}
          Search
        </button>
      </div>
    );
  }

  function errorSection() {
    const errorClassList = classNames(
      'flex justify-center',
      { 'text-white': darkTheme },
      { '': !darkTheme }
    );

    if (error) {
      return <div className={errorClassList}>{error}</div>;
    }
    return null;
  }

  function searchListSection() {
    return (
      <>
        {searchList.map((item, index) => {
          const isEven = index % 2 === 0;
          const itemClass = classNames(
            'px-2 py-1 flex rounded',
            { 'bg-blue-800 text-white': darkTheme && isEven },
            { 'bg-gray-700 text-white': darkTheme && !isEven },
            { 'bg-blue-100': !darkTheme && isEven },
            { 'bg-gray-200': !darkTheme && !isEven }
          );
          const linkClassList = classNames(
            'hover:underline',
            { 'text-blue-300': darkTheme },
            { 'text-blue-600': !darkTheme }
          );

          const alreadyAdded =
            savedLocations.find(p => p.id === item.id) != null;
          const name = `${item.name}, ${item.sys.country}`;

          return (
            <div key={item.id} className={itemClass}>
              <div>{name}</div>
              <div className="px-2 flex-1">
                <a
                  className={linkClassList}
                  href={`https://www.google.com/maps/search/${item.coord.lat},${item.coord.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  [{`${item.coord.lat},${item.coord.lon}`}]
                </a>
              </div>
              <div>
                {alreadyAdded ? (
                  <div className="bg-blue-500 text-white text-center rounded w-8">
                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      dispatch({
                        type: 'ADD_LOCATION',
                        payload: {
                          savedLocation: {
                            id: item.id,
                            lat: item.coord.lat,
                            lon: item.coord.lon,
                            name
                          }
                        }
                      });
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white rounded w-8"
                    title="Add location"
                  >
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </>
    );
  }

  function render() {
    return (
      <div>
        {searchSection()}
        <div className="pt-4">
          {errorSection()}
          {searchListSection()}
        </div>
      </div>
    );
  }

  return render();
};
