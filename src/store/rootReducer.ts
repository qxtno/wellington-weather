import { State, StateAction } from '../types';
import { STORE_VERSION } from './store';
import produce from 'immer';

export const initialState: State = {
  STORE_VERSION: STORE_VERSION,
  savedLocations: [],
  savedForecasts: {}
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
    default:
      return state;
  }
};
