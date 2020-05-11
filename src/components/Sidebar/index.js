import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../index';

const Sidebar = () => {
  return (
    <div className="sidebar" data-color="white" data-active-color="danger">
      <div className="logo">
        <Logo />
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          <li>
            <NavLink activeClassName="is-active" to="/panel/home">
              <i className="nc-icon nc-bank"></i>
              <p>Dashboard</p>
            </NavLink>
          </li>
          {/* <li>
            <NavLink activeClassName='is-active' to="/panel/clients">
              <i className="nc-icon nc-diamond"></i>
              <p>Clients</p>
            </NavLink>
          </li> */}
          <li>
            <NavLink activeClassName="is-active" to="/panel/links">
              <i className="nc-icon nc-compass-05"></i>
              <p>Links</p>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="is-active" to="/panel/locations">
              <i className="nc-icon nc-pin-3"></i>
              <p>LOCATIONS</p>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="is-active" to="/panel/events">
              <i className="nc-icon nc-calendar-60"></i>
              <p>EVENTS</p>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="is-active" to="/panel/shops">
              <i className="nc-icon nc-cart-simple"></i>
              <p>SHOPS</p>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="is-active" to="/panel/products">
              <i className="nc-icon nc-app"></i>
              <p>PRODUCTS</p>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="is-active" to="/panel/advices">
              <i className="nc-icon nc-bulb-63"></i>
              <p>ADVICES</p>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="is-active" to="/panel/subscribers">
              <i className="nc-icon nc-badge"></i>
              <p>Subscribers</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
