import { State } from '../types';
import { useReducer, useEffect } from 'react';
import { rootReducer, initialState } from '../store/rootReducer';
import { STORE_VERSION } from '../store/store';

export function useProviderValue() {
  const localStateString = localStorage.getItem('state');
  const localState: State = localStateString
    ? JSON.parse(localStateString)
    : null;
  const providerValue = useReducer(rootReducer, localState ?? initialState);
  const [state] = providerValue;

  if (STORE_VERSION !== state.STORE_VERSION) {
    localStorage.removeItem('state');
    window.location.reload();
  }

  useEffect(() => {
    if (STORE_VERSION === state.STORE_VERSION) {
      delete state.notSaved;
      localStorage.setItem('state', JSON.stringify(state));
    }
  }, [state]);

  return providerValue;
}
