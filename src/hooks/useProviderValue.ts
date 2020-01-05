import { State } from '../types';
import { useReducer, useEffect } from 'react';
import { rootReducer, initialState } from '../store/rootReducer';
import { STORE_VERSION } from '../store/store';
import { produce } from 'immer';

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
      const stateForSerialization = produce(state, (draft: State) => {
        delete draft.notSaved;
      });
      localStorage.setItem('state', JSON.stringify(stateForSerialization));
    }

    (window as any).state = state;
  }, [state]);

  return providerValue;
}
