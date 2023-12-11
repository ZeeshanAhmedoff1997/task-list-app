import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import logo from '../../assets/images/checked.png';

export default function header(props) {
  const [loader, setLoader] = useState(false);
  const history = useHistory();

  const onLogout = async () => {
    setLoader(true);
    try {
      await axios.post('/users/logout', {
        headers: { authorization: `Bearer ${props.token}` },
      });
    } catch (e) {}
    props.setToken(null);
    localStorage.clear();
    setLoader(false);
    // history.push('/')
  };

  const noAuth = (
    <React.Fragment>
      <NavLink
        style={{ textDecoration: 'none' }}
        activeClassName="navbar__link--active"
        className="navbar__link"
        to={'/sign-in'}
      >
        Sign in
      </NavLink>
      <NavLink
        style={{ textDecoration: 'none' }}
        activeClassName="navbar__link--active"
        className="navbar__link"
        to={'/sign-up'}
      >
        Sign up
      </NavLink>
    </React.Fragment>
  );

  const auth = (
    <React.Fragment>
      <NavLink
        to={'/'}
        style={{ textDecoration: 'none' }}
        className="navbar__link"
        onClick={onLogout}
      >
        Log Out
      </NavLink>
      <NavLink
        style={{ textDecoration: 'none' }}
        activeClassName="navbar__link--active"
        className="navbar__link"
        to={'/me'}
      >
        Me
      </NavLink>
    </React.Fragment>
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div
          onClick={() => {
            history.push('/');
          }}
          className="logo"
        >
          <img
            src={logo}
            width="25px"
            style={{ marginRight: '4px' }}
            alt="logo"
          />
          <NavLink
            to={props.token ? '/todo' : '/'}
            style={{ color: '#181818', textDecoration: 'none' }}
          >
            Try Hack me Assesment
          </NavLink>
        </div>
        <div className="collapse navbar-collapse">
          <NavLink
            style={{ textDecoration: 'none' }}
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/about"
          >
            About
          </NavLink>
          {props.token ? auth : noAuth}
        </div>
      </nav>
      {loader ? (
        <Loader
          className="loader"
          type="Grid"
          color="#808080"
          height={40}
          width={40}
        />
      ) : null}
    </div>
  );
}
