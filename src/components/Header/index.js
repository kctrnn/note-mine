import Logo from 'components/Logo';
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <div className='header'>
      <nav className='navbar'>
        <div className='container navbar-inner'>
          <Logo />

          <div className='navbar-nav'>
            <Link to='/login' className='nav-link'>
              Sign in
            </Link>
            <Link to='/signup' className='nav-link'>
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
