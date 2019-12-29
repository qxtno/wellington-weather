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
        <input
          className="border rounded p-1"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => {
            e.key === 'Enter' ? onSearch() : void 0;
          }}
        />
        <button
          className="rounded bg-gray-200 p-1 hover:bg-gray-300"
          onClick={onSearch}
        >
          search
        </button>

        {error && <div>{error}</div>}

        {searchList.map(item => {
          return (
            <div key={item.id}> {`${item.name}, ${item.sys.country}`} </div>
          );
        })}
      </div>
    );
  }

  return render();
};
