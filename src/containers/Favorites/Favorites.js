import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectFavorites } from './slice/selectors';
import { actions, getFavoritesWeather } from './slice/slice';
import { setLocation } from '../Weather/slice/slice';
import { selectUnitSystem } from '../App/slice/selectors';
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard';
import styles from './Favorites.module.css';

const ICON_BASE_URL = 'https://www.accuweather.com/images/weathericons/';

export default function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector(selectFavorites);
  const isMetric = useSelector(selectUnitSystem);

  useEffect(() => {
    dispatch(getFavoritesWeather(favorites));
  }, [favorites.length]);

  const removeCity = (location) => {
    dispatch(actions.toggleFavorite(location));
  };

  const setCurrentLocation = (location) => {
    dispatch(setLocation(location));
    navigate('/');
  };

  return (
    <section className={styles.container}>
      <h1>Favorites</h1>
      {!favorites.length && <p>No favorites</p>}
      {favorites.length > 0 && (
        <ul className={styles.list}>
          {favorites.map(
            ({ key, cityName, weather }) =>
              weather && (
                <FavoriteCard
                  key={key}
                  cityKey={key}
                  text={weather.text}
                  temp={
                    isMetric ? weather.temp?.metric : weather.temp?.imperial
                  }
                  icon={{
                    alt: `icon for ${weather.text}`,
                    src: weather.iconCode
                      ? `${ICON_BASE_URL}${weather.iconCode}.svg`
                      : ''
                  }}
                  name={cityName}
                  removeCity={removeCity}
                  setCurrentLocation={setCurrentLocation}
                  isMetric={isMetric}
                  errorMessage={weather.errorMessage}
                />
              )
          )}
        </ul>
      )}
    </section>
  );
}
