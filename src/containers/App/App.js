import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { actions } from '../Favorites/slice/slice';
import { selectTheme } from './slice/selectors';
import { getSettingsFromLocalStorage } from './slice/slice';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Weather from '../Weather/Weather';
import Favorites from '../Favorites/Favorites';
import Settings from '../Settings/Settings';
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(selectTheme);

  useEffect(() => {
    dispatch(actions.setFavoritesFromLocalStorage());
    dispatch(getSettingsFromLocalStorage());
  }, []);

  return (
    <div className={`${styles.app} ${isDarkTheme ? styles.dark : ''}`}>
      <Header />
      <main className={isDarkTheme ? styles.dark : ''}>
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
