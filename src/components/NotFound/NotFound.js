import React from 'react';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <h2>Page not found</h2>
      <img src="404.png" alt="commander keen not found" />
    </div>
  );
}

export default NotFound;
