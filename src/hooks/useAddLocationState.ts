import { useState, useCallback } from 'react';
import { SearchItem, FindResponseJson } from '../types';
import { buildApiUrl } from '../utils';

export function useAddLocationState() {
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState<SearchItem[]>([]);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const onSearch = useCallback(async () => {
    if (isSearching) {
      return;
    }
    console.log('searching for...', search);

    setIsSearching(true);

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
    } finally {
      setIsSearching(false);
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
  }, [isSearching, search]);

  return { search, setSearch, onSearch, error, searchList, isSearching };
}
