import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css'; 

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.activeLink : styles.navLink)}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? styles.activeLink : styles.navLink)}
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
