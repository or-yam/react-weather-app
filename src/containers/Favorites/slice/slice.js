/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../../services/api';
import { getFavorites, saveToFavorites } from '../../../services/localStorage';

export const SLICE_KEY = 'favorites';

export const initialState = {
  favoritesLocations: []
};

export const getFavoritesWeather = createAsyncThunk(
  `${SLICE_KEY}/favoritesWeather`,
  async (favorites) => {
    if (!favorites.length) return [];
    const favoritesWeather = await Promise.all(
      favorites
        .filter(({ weather }) => !weather)
        .map(({ key }) => api.fetchCurrentWeather(key))
    );
    return favoritesWeather;
  }
);

const setFavoritesWeather = (state, { payload }) => {
  state.favoritesLocations = state.favoritesLocations.map((location) => {
    const [weather] = payload.filter(({ key }) => key === location.key);
    if (!weather) {
      return location;
    }
    if (weather.error) {
      return { ...location, weather: { errorMessage: weather.error } };
    }
    return {
      ...location,
      weather: {
        text: weather.WeatherText,
        iconCode: weather.WeatherIcon,
        temp: {
          metric: weather.Temperature.Metric.Value,
          imperial: weather.Temperature.Imperial.Value
        }
      }
    };
  });
};

const setFavoritesFromLocalStorage = (state) => {
  const favorites = getFavorites();
  if (favorites) {
    state.favoritesLocations = favorites;
  }
};

const toggleFavorite = (state, { payload }) => {
  const { key } = payload;
  const isFavorite = state.favoritesLocations.find(
    ({ key: favoriteKey }) => favoriteKey === key
  );

  if (isFavorite) {
    state.favoritesLocations = state.favoritesLocations.filter(
      ({ key: favoriteKey }) => favoriteKey !== key
    );
  } else {
    state.favoritesLocations.push(payload);
  }
  saveToFavorites(state.favoritesLocations);
};

const slice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {
    setFavoritesFromLocalStorage,
    toggleFavorite
  },
  extraReducers: {
    [getFavoritesWeather.fulfilled]: setFavoritesWeather
  }
});

export default slice.reducer;
export const { actions } = slice;
