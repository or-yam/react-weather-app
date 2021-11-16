import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styles from './Search.module.css';
import { getAutoCompleteCitiesList } from './slice/slice';
import {
  selectAutoCompleteCitiesList,
  selectAutoCompleteError
} from './slice/selectors';
import { setLocation } from '../../containers/Weather/slice/slice';
import { selectTheme } from '../../containers/App/slice/selectors';

const DEBOUNCE_TIME = 600;
const NON_ENGLISH_CHARS_REGEX = /[^a-z0-9_.,-\s]/i;

export default function Search() {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState(false);
  const isDarkTheme = useSelector(selectTheme);
  const autoCompleteCitiesList = useSelector(selectAutoCompleteCitiesList);
  const error = useSelector(selectAutoCompleteError);

  const setCurrentLocation = (event, { cityName, key }) => {
    key && dispatch(setLocation({ cityName, key }));
  };

  const onInputChange = (event) => {
    if (!event?.target.value) {
      return;
    }
    // Validate only english characters
    if (event?.target.value?.match(NON_ENGLISH_CHARS_REGEX)) {
      setInputError(true);
      return;
    }
    setInputError(false);
    event?.target.value && setInput(event.target.value);
  };

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      input && dispatch(getAutoCompleteCitiesList(input));
    }, DEBOUNCE_TIME);

    return () => clearTimeout(timer);
  }, [input]);

  const renderInput = (params) => {
    if (error) {
      return <TextField {...params} error={error} label={error} />;
    }
    if (inputError) {
      return <TextField {...params} label="Invalid input" color="warning" />;
    }
    return (
      <TextField
        {...params}
        label="Search input"
        InputProps={{
          ...params.InputProps,
          type: 'search'
        }}
      />
    );
  };

  return (
    <Autocomplete
      className={`${styles.search} ${isDarkTheme ? styles.dark : ''}`}
      onChange={setCurrentLocation}
      onInputChange={onInputChange}
      disableClearable
      options={autoCompleteCitiesList}
      getOptionLabel={({ cityName, countryName }) =>
        cityName ? `${cityName} ${countryName}` : ''
      }
      renderInput={renderInput}
    />
  );
}
