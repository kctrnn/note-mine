import Logo from 'components/Logo';
import SignupForm from 'features/Auth/components/SignupForm';
import React from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div
      className='auth-signup'
      style={{ paddingTop: '8rem', paddingBottom: '3rem' }}
    >
      <Logo />
      <SignupForm />

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
