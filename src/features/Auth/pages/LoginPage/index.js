import { Chip, makeStyles } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'app/userSlice';
import Logo from 'components/Logo';
import StorageKeys from 'constants/storage-keys';
import LoginForm from 'features/Auth/components/LoginForm';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5rem',

    '& > *': {
      margin: theme.spacing(1),
    },
  },

  loginAs: {
    textAlign: 'center',
    fontSize: '1.3rem',

    '& > svg': {
      fontSize: '2.4rem',
    },

    '& > .MuiChip-avatar': {
      fontSize: '1.2rem',
    },
  },
}));

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  useEffect(() => {
    // clear local storage
    localStorage.removeItem(StorageKeys.USER);
    localStorage.removeItem(StorageKeys.TOKEN);
  }, []);

  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);

      const user = unwrapResult(resultAction);
      enqueueSnackbar('Register successfully!!! 🎉', { variant: 'success' });

      history.push('/notes');
    } catch (error) {
      console.log('Failed to login:', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleNoteMineClick = async () => {
    try {
      const values = {
        identifier: 'notemine@gmail.com',
        password: 'Notemine123',
      };

      const action = login(values);
      const resultAction = await dispatch(action);

      const user = unwrapResult(resultAction);
      enqueueSnackbar('Login successfully!!! 🎉', { variant: 'success' });

      history.push('/notes');
    } catch (error) {
      console.log('Failed to login:', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleTeoClick = async () => {
    try {
      const values = {
        identifier: 'teo@gmail.com',
        password: '123123123',
      };

      const action = login(values);
      const resultAction = await dispatch(action);

      const user = unwrapResult(resultAction);
      enqueueSnackbar('Login successfully!!! 🎉', { variant: 'success' });

      history.push('/notes');
    } catch (error) {
      console.log('Failed to login:', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div className='auth-login' style={{ paddingTop: '8rem' }}>
      <Logo />
      <LoginForm onSubmit={handleSubmit} />

      <p style={{ fontWeight: '400', textAlign: 'center' }}>
        Not a member?{' '}
        <Link to='/signup' tabIndex='-1'>
          Sign Up
        </Link>
      </p>

      <div className={classes.root}>
        <Chip
          icon={<FaceIcon />}
          label='Login as Notemine'
          className={classes.loginAs}
          clickable
          onClick={handleNoteMineClick}
        />

        <Chip
          avatar={<Avatar>T</Avatar>}
          label='Login as Teo'
          className={classes.loginAs}
          clickable
          onClick={handleTeoClick}
        />
      </div>
    </div>
  );
};

export default LoginPage;
