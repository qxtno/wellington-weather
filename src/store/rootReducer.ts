import { State, StateAction } from '../types';
import { STORE_VERSION } from './store';

export const initialState: State = {
  STORE_VERSION: STORE_VERSION,
  savedLocations: []
};

export const rootReducer = (state: State, action: StateAction) => {
  switch (action.type) {
    case 'ADD_LOCATION': {
      return {
        ...state,
        savedLocations: [...state.savedLocations, action.payload.savedLocation]
      } as State;
    }
    default:
      return state;
  }
};
