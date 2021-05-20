import React from 'react';
import PropTypes from 'prop-types';
import SignupForm from 'features/Auth/components/SignupForm';
import Logo from 'components/Logo';
import { Link } from 'react-router-dom';

const SignupPage = (props) => {
  return (
    <div className='auth-signup' style={{ paddingTop: '8rem' }}>
      <Logo />
      <SignupForm />

      <p style={{ fontWeight: '400', textAlign: 'center' }}>
        Already a member? <Link to='/login'>Sign In</Link>
      </p>
    </div>
  );
};

SignupPage.propTypes = {};

export default SignupPage;
