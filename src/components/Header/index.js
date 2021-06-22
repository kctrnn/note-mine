import { logout } from 'app/userSlice';
import Logo from 'components/Logo';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.scss';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  burger: {
    display: 'none',

    '@media screen and (max-width: 767px)': {
      display: 'block',
    },
  },
}));

const Header = () => {
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;

  const classes = useStyles();
  const [showNav, setShowNav] = useState(false);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);

    // history.push('/');

    enqueueSnackbar('See you again 👋👋', {
      variant: 'info',
    });
  };

  const burgerClick = () => {
    setShowNav((x) => !x);
  };

  return (
    <div className='header'>
      <nav className='navbar'>
        <div className='container navbar-inner'>
          <Logo />

          <IconButton className={classes.burger} onClick={burgerClick}>
            <MenuIcon fontSize='large' />
          </IconButton>

          <div className={!showNav ? 'navbar-nav' : 'navbar-nav show'}>
            {!isLoggedIn && (
              <Link to='/login' className='nav-link'>
                Sign in
              </Link>
            )}

            {!isLoggedIn && (
              <Link to='/signup' className='nav-link'>
                Sign up
              </Link>
            )}

            {isLoggedIn && (
              <Link
                to=''
                className='nav-link username'
              >{`🚀 Logged in with ${loggedInUser.username}`}</Link>
            )}

            {isLoggedIn && (
              <Link to='/notes' className='nav-link'>
                All notes
              </Link>
            )}

            {isLoggedIn && (
              <Link to='' className='nav-link' onClick={handleLogoutClick}>
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
