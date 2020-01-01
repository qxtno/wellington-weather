import { useState, useCallback } from 'react';
import { SearchItem, FindResponseJson } from '../types';
import { buildApiUrl } from '../utils';

export function useAddLocationState() {
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState<SearchItem[]>([]);
  const [error, setError] = useState('');

  const onSearch = useCallback(async () => {
    // TODO prevent race condition
    console.log('searching for...', search);
    let list: SearchItem[] = [];
    let hasError = false;
    try {
      const dataURL = buildApiUrl(`/find?q=${search}&sort=population`);
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
  }, [search]);

  return { search, setSearch, onSearch, error, searchList };
}
