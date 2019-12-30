import { State } from '../types';
import { useReducer, useEffect } from 'react';
import { rootReducer, initialState } from '../store/rootReducer';

export function useProviderValue() {
  const localStateString = localStorage.getItem('state');
  const localState: State = localStateString
    ? JSON.parse(localStateString)
    : null;
  const providerValue = useReducer(rootReducer, localState ?? initialState);
  const [state] = providerValue;

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, [state]);

  return providerValue;
}
