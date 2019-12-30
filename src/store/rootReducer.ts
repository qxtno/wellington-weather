import { State, StateAction, AddLocationActionPayload } from '../types';
import { ADD_LOCATION } from './actions';

export const initialState: State = {
  saveLocationIds: []
};

export const rootReducer = (state: State, action: StateAction) => {
  switch (action.type) {
    case ADD_LOCATION: {
      return {
        ...state,
        saveLocationIds: [
          ...state.saveLocationIds,
          (action.payload as AddLocationActionPayload).locationId
        ]
      };
    }
    default:
      return state;
  }
};
