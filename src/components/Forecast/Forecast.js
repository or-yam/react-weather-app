import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../containers/App/slice/selectors';
import styles from './Forecast.module.css';

export default function Forecast({ forecast, iconBaseUrl }) {
  const isDarkTheme = useSelector(selectTheme);
  const { forecastDays, headLine } = forecast;
  const { isMetric } = forecastDays ? forecastDays[0].temp : true;

  const weekDay = (date) => new Date(date).toDateString().split(' ')[0];

  const renderUnits = () =>
    isMetric ? <span>&#8451;</span> : <span>&#8457;</span>;

  return (
    <div className={`${styles.container} ${isDarkTheme ? styles.dark : ''}`}>
      <h3 className={styles.mainTitle}>{headLine}</h3>
      <ul className={styles.list}>
        {!forecastDays ? (
          <p>No forecast available</p>
        ) : (
          forecastDays.map(({ date, temp, iconsCode, text }) => (
            <li className={styles.listItem} key={date}>
              <h3>{weekDay(date)}</h3>
              <p>
                {temp.max} - {temp.min} {renderUnits()}
              </p>
              <div className={styles.iconsContainer}>
                <img
                  src={`${iconBaseUrl}${iconsCode?.day}.svg`}
                  alt={`${text}-day-icon`}
                />
                <img
                  src={`${iconBaseUrl}${iconsCode?.night}.svg`}
                  alt={`${text}-night-icon`}
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

Forecast.propTypes = {
  forecast: PropTypes.shape({
    forecastDays: PropTypes.array,
    headLine: PropTypes.string
  }),
  iconBaseUrl: PropTypes.string.isRequired
};

Forecast.defaultProps = {
  forecast: {
    forecastDays: [],
    headLine: ''
  }
};
