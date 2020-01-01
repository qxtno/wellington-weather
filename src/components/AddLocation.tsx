import React, { useContext } from 'react';
import { useAddLocationState } from '../hooks/useAddLocationState';
import classNames from 'classnames';
import { stateContext } from '../store/store';
import { AddLocationAction } from '../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

export const AddLocation: React.FC = () => {
  const {
    search,
    setSearch,
    onSearch,
    error,
    searchList
  } = useAddLocationState();

  const [state, dispatch] = useContext(stateContext);
  const { savedLocations } = state;

  function searchSection() {
    return (
      <div className="flex max-w-sm mx-auto">
        <input
          className="border flex-1 px-2 rounded min-w-0"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => {
            e.key === 'Enter' ? onSearch() : void 0;
          }}
        />
        <button
          className="rounded bg-gray-200 ml-2 px-4 p-1 hover:bg-gray-300"
          onClick={onSearch}
        >
          Search
        </button>
      </div>
    );
  }

  function errorSection() {
    if (error) {
      return <div className="flex justify-center">{error}</div>;
    }
    return null;
  }

  function searchListSection() {
    return (
      <>
        {searchList.map((item, index) => {
          const evenOdd = index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100';
          const itemClass = classNames('px-2 py-1 flex rounded', evenOdd);

          const alreadyAdded =
            savedLocations.find(p => p.id === item.id) != null;
          const name = `${item.name}, ${item.sys.country}`;

          return (
            <div key={item.id} className={itemClass}>
              <div>{name}</div>
              <div className="px-2 flex-1">
                <a
                  className="hover:underline text-blue-600"
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
                      dispatch(
                        new AddLocationAction({
                          savedLocation: {
                            id: item.id,
                            lat: item.coord.lat,
                            lon: item.coord.lon,
                            name
                          }
                        })
                      );
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
