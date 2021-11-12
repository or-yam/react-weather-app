import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { selectTheme } from '../../containers/App/slice/selectors';
import styles from './Header.module.css';

const renderNavLink = (to, title, className) => (
  <Link className={styles[className]} to={to}>
    <Button variant="contained" color="primary">
      <li>{title}</li>
    </Button>
  </Link>
);

function Header() {
  const isDarkTheme = useSelector(selectTheme);

  return (
    <header className={`${styles.header} ${isDarkTheme ? styles.dark : ''}`}>
      <nav>
        <ul className={styles.list}>
          {renderNavLink('/', 'weather', 'listItem')}
          {renderNavLink('favorites', 'favorites', 'listItem')}
          {renderNavLink('settings', 'settings', 'listItem')}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
