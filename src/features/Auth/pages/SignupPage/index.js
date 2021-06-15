import { unwrapResult } from '@reduxjs/toolkit';
import { signup } from 'app/userSlice';
import Logo from 'components/Logo';
import SignupForm from 'features/Auth/components/SignupForm';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const SignupPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      const action = signup(values);
      const resultAction = await dispatch(action);

      const user = unwrapResult(resultAction);
      const firstPageId = user.pages[0]?.pageId;

      if (firstPageId) {
        history.push(`/${user.username}/${firstPageId}`);
      } else {
        history.push(`/${user.username}`);
      }
    } catch (error) {
      console.log('Failed to login:', error);
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
