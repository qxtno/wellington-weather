export const API_KEY = 'a6f5e71270d6cf818259c65eee77cd8d';
export const API_URL = 'https://api.openweathermap.org/data/2.5';

export interface State {
  STORE_VERSION: number;
  savedLocations: SavedLocation[];
}

export interface SavedLocation {
  id: number;
  name: string;
  lat: number;
  lon: number;
}

export type StateActionType = 'ADD_LOCATION';

export type StateAction = {
  type: StateActionType;
  payload: AddLocationActionPayload;
};
//| { type: 'DELETE_MENU', payload: { menuId: number, folderId: number } };

export interface AddLocationActionPayload {
  savedLocation: SavedLocation;
}

export interface CardContainerProps {
  className?: string;
}

export interface SearchItem {
  id: number;
  name: string;
  sys: {
    country: string;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

export interface FindResponseJson {
  cod: '200' | '400' | string;
  message: string;
  count: number;
  list: SearchItem[];
}

export interface WeatherResponseJson {
  cod: '200' | '400' | string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];
}

export interface WeatherCardProps {
  savedLocation: SavedLocation;
}

export interface WeatherInfo {
  temp: number;
  temp_min: number;
  temp_max: number;
  sky: string;
  icon: string;
}
