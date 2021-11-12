/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGeoLocation } from '../../../services/api';
import { getSettings, saveSettings } from '../../../services/localStorage';

export const SLICE_KEY = 'app';

export const initialState = {
  userLocation: {},
  isMetric: true,
  isDarkTheme: false,
  errorMessage: null
};

export const getUserCity = createAsyncThunk(
  `${SLICE_KEY}/userCity`,
  async (location) => fetchGeoLocation(location)
);

const setUserCity = (state, { payload }) => {
  payload.error
    ? (state.errorMessage = payload.error)
    : (state.userLocation = {
        ...state.userLocation,
        key: payload.Key,
        cityName: payload.LocalizedName
      });
};

const slice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {
    setUserLocation: (state, { payload }) => {
      state.userLocation = payload;
    },
    setTheme: (state, { payload }) => {
      state.isDarkTheme = payload;
      saveSettings({ isDarkTheme: payload, isMetric: state.isMetric });
    },
    setUnitSystem: (state, { payload }) => {
      state.isMetric = payload;
      saveSettings({ isMetric: payload, isDarkTheme: state.isDarkTheme });
    },
    getSettingsFromLocalStorage: (state) => {
      const settings = getSettings();
      if (!settings) return;
      state.isMetric = settings?.isMetric || state.isMetric;
      state.isDarkTheme = settings?.isDarkTheme || state.isDarkTheme;
    }
  },
  extraReducers: {
    [getUserCity.fulfilled]: setUserCity
  }
});

export default slice.reducer;
export const {
  setUserLocation,
  setTheme,
  setUnitSystem,
  getSettingsFromLocalStorage
} = slice.actions;
