import React, { useContext } from 'react';
import { StateAction, State } from '../types';

export const STORE_VERSION = 1;

const stateContext = React.createContext<[State, React.Dispatch<StateAction>]>([
  {} as any,
  {} as any
]);

export function useAppState() {
  const [state] = useContext(stateContext);
  return state;
}

export function useDispatch() {
  const [, dispatch] = useContext(stateContext);
  return dispatch;
}

export const Provider = stateContext.Provider;
export const Consumer = stateContext.Consumer;
export { stateContext };
