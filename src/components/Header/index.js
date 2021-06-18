import { logout } from 'app/userSlice';
import Logo from 'components/Logo';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;

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

  return (
    <div className='header'>
      <nav className='navbar'>
        <div className='container navbar-inner'>
          <Logo />

          <div className='navbar-nav'>
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
