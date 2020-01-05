export const API_KEY = 'a6f5e71270d6cf818259c65eee77cd8d';
export const API_URL = 'https://api.openweathermap.org/data/2.5';

export interface State {
  STORE_VERSION: number;
  savedLocations: SavedLocation[];
  savedForecasts: SavedForecastInfoIndex;
  darkTheme: boolean;
  notSaved: {
    settingsDrawerOpen: boolean;
  };
}

export interface SavedForecastInfoIndex {
  [id: number]: SavedForecastInfo;
}

export interface SavedForecastInfo {
  fetchTime: number;
  forecastInfos: ForecastInfo[];
}

export interface ForecastInfo {
  temp: number;
  temp_min: number;
  temp_max: number;
  sky: string;
  icon: string;
  dt: number;
}

export interface SavedLocation {
  id: number;
  name: string;
  lat: number;
  lon: number;
  weatherInfo?: WeatherInfo;
}

export type StateAction =
  | {
      type: 'ADD_LOCATION';
      payload: AddLocationActionPayload;
    }
  | {
      type: 'SET_WEATHER_INFO';
      payload: { locationId: number; weatherInfo: WeatherInfo };
    }
  | {
      type: 'SET_FORECAST_INFO';
      payload: { locationId: number; savedForecastInfo: SavedForecastInfo };
    }
  | { type: 'OPEN_SETTINGS_DRAWER' }
  | { type: 'CLOSE_SETTINGS_DRAWER' }
  | { type: 'REMOVE_LOCATION'; payload: { locationId: number } }
  | { type: 'TOGGLE_THEME' };
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
  fetchTime: number;
}

export interface FetchForecastResponse {
  error: string | undefined;
  savedForecastInfo: SavedForecastInfo | undefined;
}

export type API_cod = string;

export type API_message = string | number;

export interface ForecastResponseJson {
  cod: API_cod;
  message: API_message;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  }[];
}
