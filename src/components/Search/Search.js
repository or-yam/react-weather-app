import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styles from './Search.module.css';
import { getAutoCompleteCitiesList } from './slice/slice';
import { selectAutoCompleteCitiesList } from './slice/selectors';
import { setLocation } from '../../containers/Weather/slice/slice';
import { selectTheme } from '../../containers/App/slice/selectors';

export default function Search() {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  // TODO use local state instead of redux

  const isDarkTheme = useSelector(selectTheme);
  const autoCompleteCitiesList = useSelector(selectAutoCompleteCitiesList);

  const setCurrentLocation = (event, { cityName, key }) => {
    key && dispatch(setLocation({ cityName, key }));
  };

  const onInputChange = (event) => {
    event?.target.value && setInput(event.target.value);
  };

  useEffect(() => {
    input && dispatch(getAutoCompleteCitiesList(input));
  }, [input]);

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
      renderInput={(params) => (
        <TextField
          onClick={() => {}}
          {...params}
          label="Search input"
          InputProps={{
            ...params.InputProps,
            type: 'search'
          }}
        />
      )}
    />
  );
}
