import { useState } from 'react';
import { API_KEY, SearchItem, FindResponseJson } from '../types';

export function useAddLocationState() {
  const [search, setSearch] = useState('lublin');
  const [searchList, setSearchList] = useState<SearchItem[]>([]);
  const [error, setError] = useState('');

  async function onSearch() {
    console.warn('searching for...', search);
    let list: SearchItem[] = [];
    let hasError = false;
    try {
      //https://openweathermap.org/data/2.5/find?callback=jQuery19107896401557608224_1577543304238&q=rome&type=like&sort=population&cnt=30&appid=b6907d289e10d714a6e88b30761fae22&_=1577543304240
      const dataURL =
        'https://api.openweathermap.org/data/2.5/find?q=' +
        search +
        '&APPID=' +
        API_KEY;
      const response = await fetch(dataURL);
      const json: FindResponseJson = await response.json();
      console.log('json', json);
      if (json.cod === '200') {
        list = json.list;
      } else if (json.cod === '400') {
        hasError = true;
      }
    } catch (error) {
      hasError = true;
    }
    if (hasError) {
      setError(`Unable to find city: '${search}'`);
      setSearch('');
    } else {
      setError('');
    }
    setSearchList(list);
  }
  return { search, setSearch, onSearch, error, searchList };
}
