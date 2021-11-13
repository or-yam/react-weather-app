import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../containers/App/slice/selectors';
import styles from './Footer.module.css';

function Footer() {
  const isDarkTheme = useSelector(selectTheme);

  return (
    <footer className={`${styles.footer} ${isDarkTheme && styles.dark}`}>
      <span>
        Created by{' '}
        <a color="inherit" href="https://github.com/or-yam/">
          ORYAM
        </a>
        &nbsp;
        {new Date().getFullYear()}
      </span>
    </footer>
  );
}

export default Footer;
