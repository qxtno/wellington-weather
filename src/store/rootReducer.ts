import { State, StateAction } from '../types';
import { INCREMENT } from './actions';

export const initialState: State = {
  counter: 5
};

export const rootReducer = (state: State, action: StateAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state
      };
    case 'LOGIN_ERROR':
      return {
        ...state
      };
    case 'LOGOUT':
      return {
        ...state
      };

    case INCREMENT:
      return {
        ...state,
        counter: state.counter ? state.counter + 1 : 0
      };

    default:
      return state;
  }
};
