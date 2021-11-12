/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../../services/api';

export const SLICE_KEY = 'autoComplete';

export const initialState = {
  autoCompleteResults: []
};

export const getAutoCompleteCitiesList = createAsyncThunk(
  `${SLICE_KEY}/citesList`,
  (query) => api.fetchAutoCompleteCitiesList(query)
);

const setAutoCompleteResults = (state, { payload: results }) => {
  state.autoCompleteResults = results.map(
    ({
      Key: key,
      LocalizedName: cityName,
      Country: { LocalizedName: countryName }
    }) => ({
      key,
      cityName,
      countryName
    })
  );
};

const slice = createSlice({
  name: SLICE_KEY,
  initialState,
  extraReducers: {
    [getAutoCompleteCitiesList.fulfilled]: setAutoCompleteResults
  }
});

export default slice.reducer;
