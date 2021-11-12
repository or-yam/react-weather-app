import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { setTheme, setUnitSystem } from '../App/slice/slice';
import { selectTheme, selectUnitSystem } from '../App/slice/selectors';
import styles from './Settings.module.css';

export default function Settings() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const unitSystem = useSelector(selectUnitSystem);

  return (
    <section className={styles.container}>
      <h1>Settings</h1>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={theme}
              onChange={(e, value) => {
                dispatch(setTheme(value));
              }}
            />
          }
          label="Dark Theme"
        />
        <FormControlLabel
          control={
            <Switch
              checked={unitSystem}
              onChange={(e, value) => {
                dispatch(setUnitSystem(value));
              }}
            />
          }
          label="Metric Units"
        />
      </FormGroup>
    </section>
  );
}
