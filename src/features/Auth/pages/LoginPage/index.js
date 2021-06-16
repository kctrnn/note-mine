import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'app/userSlice';
import Logo from 'components/Logo';
import LoginForm from 'features/Auth/components/LoginForm';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import StorageKeys from 'constants/storage-keys';

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

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

      // const firstPageId = user.pages[0]?.pageId;

      // if (firstPageId) {
      //   history.push(`/${user.username}/${firstPageId}`);
      // } else {
      //   history.push(`/${user.username}`);
      // }
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
    </div>
  );
};

export default LoginPage;
