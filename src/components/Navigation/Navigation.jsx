import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')}
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
