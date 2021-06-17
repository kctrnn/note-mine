import { unwrapResult } from '@reduxjs/toolkit';
import { signup } from 'app/userSlice';
import Logo from 'components/Logo';
import SignupForm from 'features/Auth/components/SignupForm';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import StorageKeys from 'constants/storage-keys';

const SignupPage = () => {
  useEffect(() => {
    // clear local storage
    localStorage.removeItem(StorageKeys.USER);
    localStorage.removeItem(StorageKeys.TOKEN);
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = signup(values);
      const resultAction = await dispatch(action);

      const user = unwrapResult(resultAction);
      enqueueSnackbar('Register successfully!!! 🎉', { variant: 'success' });

      history.push('/notes');
    } catch (error) {
      console.log('Failed to login:', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div
      className='auth-signup'
      style={{ paddingTop: '8rem', paddingBottom: '3rem' }}
    >
      <Logo />
      <SignupForm onSubmit={handleSubmit} />

      <p style={{ fontWeight: '400', textAlign: 'center' }}>
        Already a member?{' '}
        <Link to='/login' tabIndex='-1'>
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
