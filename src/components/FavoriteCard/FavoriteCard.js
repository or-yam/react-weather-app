import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { selectTheme } from '../../containers/App/slice/selectors';
import styles from './FavoriteCard.module.css';

export default function FavoriteCard({
  cityKey,
  text,
  temp,
  icon,
  name,
  removeCity,
  setCurrentLocation,
  isMetric
}) {
  const isDarkTheme = useSelector(selectTheme);

  const selectCity = () => {
    setCurrentLocation({ key: cityKey, cityName: name });
  };

  const onRemove = () => {
    removeCity({ key: cityKey });
  };

  return (
    <li className={`${styles.container} ${isDarkTheme ? styles.dark : ''}`}>
      <div className={styles.cityContainer}>
        <h2>{name}</h2>
        <IconButton
          size="large"
          onClick={onRemove}
          aria-label="like"
          color="primary"
        >
          <FavoriteIcon />
        </IconButton>
      </div>
      <button type="button" onClick={selectCity}>
        <h2 className={styles.title}>{text}</h2>
        <div className={styles.infoContainer}>
          <img className={styles.weatherIcon} src={icon.src} alt={icon.alt} />
          <p className={styles.temp}>
            {temp} {isMetric ? <span>&#8451;</span> : <span>&#8457;</span>}
          </p>
        </div>
      </button>
    </li>
  );
}

FavoriteCard.propTypes = {
  cityKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  removeCity: PropTypes.func.isRequired,
  text: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  temp: PropTypes.number,
  icon: PropTypes.shape({ src: PropTypes.string, alt: PropTypes.string }),
  setCurrentLocation: PropTypes.func.isRequired,
  isMetric: PropTypes.bool.isRequired
};

FavoriteCard.defaultProps = {
  text: '',
  temp: 0,
  icon: { src: '', alt: '' }
};
