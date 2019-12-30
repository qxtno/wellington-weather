import React from 'react';
import { useAddLocationState } from '../hooks/useAddLocationState';

export const AddLocation: React.FC = () => {
  const {
    search,
    setSearch,
    onSearch,
    error,
    searchList
  } = useAddLocationState();

  function render() {
    return (
      <div>
        <div className="flex max-w-sm mx-auto">
          <input
            className="border flex-1 px-2 rounded"
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

        {error && <div>{error}</div>}

        {searchList.map(item => {
          return (
            <div key={item.id}>
              {`${item.name}, ${item.sys.country}`}
              <a
                className="hover:underline text-blue-600"
                href={`https://www.google.com/maps/search/${item.coord.lat},${item.coord.lon}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                see location [{`${item.coord.lat},${item.coord.lon}`}]
              </a>
            </div>
          );
        })}
      </div>
    );
  }

  return render();
};
