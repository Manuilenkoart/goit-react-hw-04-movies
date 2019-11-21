import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import css from './Navigation.module.css';

const Navigation = () => (
  <ul className={css.navList}>
    <li className={css.navListItem}>
      <NavLink exact to={routes.HOME} style={{}}>
        Home
      </NavLink>
    </li>
    <li className={css.navListItem}>
      <NavLink to={routes.MOVIES}>Movies</NavLink>
    </li>
  </ul>
);
export default Navigation;
