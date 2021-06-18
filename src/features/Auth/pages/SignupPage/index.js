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

  const handleSubmit = async (values) => {
    try {
      const action = signup(values);
      const resultAction = await dispatch(action);

      const user = unwrapResult(resultAction);
      enqueueSnackbar('Register successfully 🎉🎉', { variant: 'success' });

      history.push('/notes');
    } catch (error) {
      console.log('Failed to login:', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div
      className='auth-signup'
      style={{ paddingTop: '5rem', paddingBottom: '3rem' }}
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
