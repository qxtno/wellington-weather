import React from 'react';
import { StateAction, State } from '../types';

export const STORE_VERSION = 1;

const stateContext = React.createContext<[State, React.Dispatch<StateAction>]>([
  {} as any,
  {} as any
]);

export const Provider = stateContext.Provider;
export const Consumer = stateContext.Consumer;
export { stateContext };
