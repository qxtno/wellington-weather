import { State, StateAction, AddLocationActionPayload } from '../types';
import { ADD_LOCATION } from './actions';

export const initialState: State = {
  savedLocations: []
};

export const rootReducer = (state: State, action: StateAction) => {
  switch (action.type) {
    case ADD_LOCATION: {
      return {
        ...state,
        savedLocations: [
          ...state.savedLocations,
          (action.payload as AddLocationActionPayload).savedLocation
        ]
      } as State;
    }
    default:
      return state;
  }
};
