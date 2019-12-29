import { useState } from 'react';
import { API_KEY, SearchItem, FindResponseJson } from '../types';

export function useAddLocationState() {
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState<SearchItem[]>([]);
  const [error, setError] = useState('');

  async function onSearch() {
    // TODO prevent race condition
    console.log('searching for...', search);
    let list: SearchItem[] = [];
    let hasError = false;
    try {
      const dataURL =
        'https://api.openweathermap.org/data/2.5/find?q=' +
        search +
        '&sort=population' +
        '&APPID=' +
        API_KEY;
      const response = await fetch(dataURL);
      const json: FindResponseJson = await response.json();
      console.warn('json', json);
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
    } else {
      if (list.length === 0) {
        setError('No results');
      } else {
        setError('');
      }
    }
    setSearchList(list);
  }
  return { search, setSearch, onSearch, error, searchList };
}
