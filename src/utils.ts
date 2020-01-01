import { API_URL, API_KEY } from './types';

/**
 * https://api.openweathermap.org/data/2.5 + part + APPID
 * @param part URL part
 */
export function buildApiUrl(part: string) {
  return `${API_URL}${part}&units=metric&APPID=${API_KEY}`;
}

export function getIconUrl(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
