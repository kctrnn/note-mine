import React from 'react';
import PropTypes from 'prop-types';
import SignupForm from 'features/Auth/components/SignupForm';
import Logo from 'components/Logo';

const SignupPage = (props) => {
  return (
    <div>
      <Logo />
      <SignupForm />
    </div>
  );
};

SignupPage.propTypes = {};

export default SignupPage;
