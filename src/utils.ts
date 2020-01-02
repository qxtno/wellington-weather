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

export const HOUR_MILLISECONDS = 1 * 60 * 60 * 1000;

/**
 * Time in milliseconds
 */
export function timeInLastPeriod({
  time,
  periodDuration
}: {
  time: number;
  periodDuration: number;
}) {
  const diff = Math.abs(Date.now() - time);
  return diff < periodDuration;
}
