import React from 'react';
import { StateAction, State } from '../types';

const stateContext = React.createContext<[State, React.Dispatch<StateAction>]>([
  {} as any,
  {} as any
]);

export const Provider = stateContext.Provider;
export const Consumer = stateContext.Consumer;
export { stateContext };
