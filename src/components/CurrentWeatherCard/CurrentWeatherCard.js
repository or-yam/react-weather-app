import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { selectTheme } from '../../containers/App/slice/selectors';
import styles from './CurrentWeatherCard.module.css';

export default function CurrentWeatherCard({
  text,
  temp,
  isMetric,
  icon,
  name,
  toggleFavorite,
  isFavorite
}) {
  const isDarkTheme = useSelector(selectTheme);

  return (
    <div className={`${styles.container} ${isDarkTheme ? styles.dark : ''}`}>
      <div className={styles.cityContainer}>
        <h2>{name}</h2>
        <IconButton
          size="large"
          onClick={toggleFavorite}
          aria-label="like"
          color={isFavorite ? 'primary' : 'default'}
        >
          <FavoriteIcon />
        </IconButton>
      </div>
      <h2 className={styles.title}>{text}</h2>
      <div className={styles.infoContainer}>
        <img className={styles.weatherIcon} src={icon.src} alt={icon.alt} />
        <p className={styles.temp}>
          {temp} {isMetric ? <span>&#8451;</span> : <span>&#8457;</span>}
        </p>
      </div>
    </div>
  );
}

CurrentWeatherCard.propTypes = {
  name: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  text: PropTypes.string,
  temp: PropTypes.number,
  isMetric: PropTypes.bool,
  icon: PropTypes.shape({ src: PropTypes.string, alt: PropTypes.string })
};

CurrentWeatherCard.defaultProps = {
  text: '',
  temp: 0,
  isMetric: true,
  icon: { src: '', alt: '' }
};
