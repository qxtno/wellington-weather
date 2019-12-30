export const API_KEY = 'a6f5e71270d6cf818259c65eee77cd8d';

export interface State {
  counter?: number;
}

export interface StateAction {
  type: string;
  payload?: any;
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
