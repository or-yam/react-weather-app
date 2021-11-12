import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Search from '../../components/Search/Search';
import CurrentWeatherCard from '../../components/CurrentWeatherCard/CurrentWeatherCard';
import Forecast from '../../components/Forecast/Forecast';
import { getCurrentWeather, getForecast, setLocation } from './slice/slice';
import {
  selectCurrentWeather,
  selectForecast,
  selectLocation
} from './slice/selectors';
import { selectFavorites } from '../Favorites/slice/selectors';
import { actions } from '../Favorites/slice/slice';
import { selectUnitSystem } from '../App/slice/selectors';
import useGeolocation from '../../services/useGeolocation';
import styles from './Weather.module.css';

const ICON_BASE_URL = 'https://www.accuweather.com/images/weathericons/';

export default function Weather() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { text, temp, iconCode } = useSelector(selectCurrentWeather);
  const { key: locationKey, cityName } = useSelector(selectLocation);
  const forecast = useSelector(selectForecast);
  const favorites = useSelector(selectFavorites);
  const isMetric = useSelector(selectUnitSystem);
  const { userLocation, getLocation } = useGeolocation();

  const isFavorite = !!favorites.find((fav) => fav.key === locationKey);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await Promise.all([
        dispatch(getCurrentWeather(locationKey)),
        dispatch(getForecast(locationKey, isMetric))
      ]);
      setIsLoading(false);
    })();
  }, [locationKey]);

  const toggleFavorite = () => {
    dispatch(actions.toggleFavorite({ key: locationKey, cityName }));
  };

  const setUserLocationWeather = () => {
    getLocation();
    dispatch(
      setLocation({ key: userLocation.key, cityName: userLocation.cityName })
    );
  };

  if (isLoading)
    return (
      <div className={styles.container}>
        <CircularProgress />
      </div>
    );

  return (
    <section className={styles.container}>
      <Search />

      <Button
        variant="outlined"
        startIcon={<LocationOnIcon />}
        onClick={setUserLocationWeather}
      >
        Get Location Weather
      </Button>
      <CurrentWeatherCard
        name={cityName}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        text={text}
        temp={isMetric ? temp?.metric : temp?.imperial}
        isMetric={isMetric}
        icon={{
          alt: `icon for ${text}`,
          src: iconCode ? `${ICON_BASE_URL}${iconCode}.svg` : ''
        }}
      />
      {forecast.forecastDays && (
        <Forecast forecast={forecast} iconBaseUrl={ICON_BASE_URL} />
      )}
    </section>
  );
}
