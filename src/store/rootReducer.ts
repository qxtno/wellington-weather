import { State, StateAction } from '../types';
import { STORE_VERSION } from './store';
import produce from 'immer';

export const initialState: State = {
  STORE_VERSION: STORE_VERSION,
  savedLocations: [],
  savedForecasts: {},
  darkTheme: false,
  notSaved: {
    settingsDrawerOpen: false
  }
};

export const rootReducer = (state: State, action: StateAction): State => {
  switch (action.type) {
    case 'ADD_LOCATION':
      return produce(state, (draft: State) => {
        draft.savedLocations.push(action.payload.savedLocation);
      });
    case 'SET_WEATHER_INFO':
      return produce(state, (draft: State) => {
        const savedLocation = draft.savedLocations.find(
          location => location.id === action.payload.locationId
        );
        if (savedLocation != null) {
          savedLocation.weatherInfo = action.payload.weatherInfo;
        }
      });
    case 'SET_FORECAST_INFO':
      return produce(state, (draft: State) => {
        const { locationId, savedForecastInfo } = action.payload;
        draft.savedForecasts[locationId] = savedForecastInfo;
      });
    case 'OPEN_SETTINGS_DRAWER':
      return {
        ...state,
        notSaved: { ...state.notSaved, settingsDrawerOpen: true }
      };
    case 'CLOSE_SETTINGS_DRAWER':
      return {
        ...state,
        notSaved: { ...state.notSaved, settingsDrawerOpen: false }
      };
    case 'REMOVE_LOCATION':
      return produce(state, (draft: State) => {
        const { locationId } = action.payload;
        draft.savedLocations = draft.savedLocations.filter(
          p => p.id !== locationId
        );
      });
    case 'TOGGLE_THEME':
      return { ...state, darkTheme: !state.darkTheme };
    default:
      return state;
  }
};
