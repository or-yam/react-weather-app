const STORAGE_NAME = 'WEATHER_APP_REACT';

export const saveToFavorites = (data) => {
  localStorage.setItem(`${STORAGE_NAME}_FAVORITES`, JSON.stringify(data));
};

export const getFavorites = () => {
  const results = localStorage.getItem(`${STORAGE_NAME}_FAVORITES`);
  if (!results) return null;
  console.info('favorites restored from local storage');
  return JSON.parse(results);
};

export const saveSettings = (data) => {
  localStorage.setItem(`${STORAGE_NAME}_SETTINGS`, JSON.stringify(data));
};

export const getSettings = () => {
  const results = localStorage.getItem(`${STORAGE_NAME}_SETTINGS`);
  if (!results) return null;
  console.info('settings restored from local storage');
  return JSON.parse(results);
};
