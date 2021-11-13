/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../../services/api';

export const SLICE_KEY = 'weather';

export const initialState = {
  location: { key: '215854', cityName: 'Tel Aviv' },
  forecast: {},
  currentWeather: {},
  errorMessage: null
};

export const getCurrentWeather = createAsyncThunk(
  `${SLICE_KEY}/currentWeather`,
  (locationKey) => api.fetchCurrentWeather(locationKey)
);

export const getForecast = createAsyncThunk(
  `${SLICE_KEY}/forecast`,
  ({ locationKey, isMetric }) => api.fetchForecast(locationKey, isMetric)
);

const setForecast = (state, { payload: forecast }) => {
  forecast.error
    ? (state.errorMessage = `${forecast.error}, could not fetch forecast`)
    : (state.forecast = {
        headLine: forecast.Headline.Text,
        forecastDays: forecast.DailyForecasts.map(
          ({ Date: date, Temperature: temp, Day: day, Night: night }) => ({
            date,
            temp: {
              isMetric: temp.Minimum.Unit === 'C',
              min: temp.Minimum.Value,
              max: temp.Maximum.Value
            },
            iconsCode: { day: day.Icon, night: night.Icon },
            text: { day: day.IconPhrase, night: night.IconPhrase }
          })
        )
      });
};

const setCurrentWeather = (state, { payload: weather }) => {
  weather.error
    ? (state.errorMessage = `${weather.error}, could not fetch weather`)
    : (state.currentWeather = {
        text: weather.WeatherText,
        iconCode: weather.WeatherIcon,
        temp: {
          metric: weather.Temperature.Metric.Value,
          imperial: weather.Temperature.Imperial.Value
        },
        key: weather.Key
      });
};

const slice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {
    setLocation: (state, { payload }) => {
      state.location = payload;
    }
  },
  extraReducers: {
    [getCurrentWeather.fulfilled]: setCurrentWeather,
    [getForecast.fulfilled]: setForecast
  }
});

export default slice.reducer;
export const { setLocation } = slice.actions;
