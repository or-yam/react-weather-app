import { createSelector } from '@reduxjs/toolkit';
import { initialState, SLICE_KEY } from './slice';

const selectAutoCompleteState = (state) => state[SLICE_KEY] || initialState;

export const selectAutoCompleteCitiesList = createSelector(
  selectAutoCompleteState,
  ({ autoCompleteResults }) => autoCompleteResults
);

export const selectAutoCompleteError = createSelector(
  selectAutoCompleteState,
  ({ errorMessage }) => errorMessage
);
