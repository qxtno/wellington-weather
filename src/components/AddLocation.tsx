import React, { useState } from 'react';
import { API_KEY } from '../types';

export const AddLocation: React.FC = () => {
  const [search, setSearch] = useState('');

  async function onSearch() {
    console.warn('searching for...', search);

    try {
      //https://openweathermap.org/data/2.5/find?callback=jQuery19107896401557608224_1577543304238&q=rome&type=like&sort=population&cnt=30&appid=b6907d289e10d714a6e88b30761fae22&_=1577543304240

      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/find?q=' +
          search +
          '&APPID=' +
          API_KEY
      );
      const json = await response.json();
      console.log('json', json);
    } catch (error) {
      console.warn('error: \n\n', error);
    }
  }

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
      </div>
    );
  }

  return render();
};
