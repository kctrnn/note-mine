import { unwrapResult } from '@reduxjs/toolkit';
import { signup } from 'app/userSlice';
import Logo from 'components/Logo';
import SignupForm from 'features/Auth/components/SignupForm';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const SignupPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  // redirect to home page if is logged in
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (isLoggedIn) {
    history.push('/');
  }

  const handleSubmit = async (values) => {
    try {
      const action = signup(values);
      const resultAction = await dispatch(action);

      unwrapResult(resultAction);
      enqueueSnackbar('Register successfully 🎉🎉', { variant: 'success' });

      history.push('/notes');
    } catch (error) {
      console.log('Failed to signup:', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div className='auth-signup' style={{ padding: '5rem 1rem 3rem' }}>
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
