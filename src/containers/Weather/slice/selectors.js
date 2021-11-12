import { createSelector } from '@reduxjs/toolkit';
import { initialState, SLICE_KEY } from './slice';

const selectWeatherState = (state) => state[SLICE_KEY] || initialState;

export const selectCurrentWeather = createSelector(
  selectWeatherState,
  ({ currentWeather }) => currentWeather
);

export const selectForecast = createSelector(
  selectWeatherState,
  ({ forecast }) => forecast || {}
);

export const selectLocation = createSelector(
  selectWeatherState,
  ({ location }) => location || {}
);
