import { createSelector } from '@reduxjs/toolkit';
import { initialState, SLICE_KEY } from './slice';

const selectFavoritesState = (state) => state[SLICE_KEY] || initialState;

// eslint-disable-next-line import/prefer-default-export
export const selectFavorites = createSelector(
  selectFavoritesState,
  ({ favoritesLocations }) => favoritesLocations
);
