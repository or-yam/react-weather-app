import { createSelector } from '@reduxjs/toolkit';
import { initialState, SLICE_KEY } from './slice';

const selectAppState = (state) => state[SLICE_KEY] || initialState;

export const selectUserLocation = createSelector(
  selectAppState,
  ({ userLocation }) => userLocation
);

export const selectTheme = createSelector(
  selectAppState,
  ({ isDarkTheme }) => isDarkTheme
);

export const selectUnitSystem = createSelector(
  selectAppState,
  ({ isMetric }) => isMetric
);
