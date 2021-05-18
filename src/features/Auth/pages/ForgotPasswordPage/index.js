import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'components/Logo';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from 'features/Auth/components/ForgotPasswordForm';

const ForgotPasswordPage = (props) => {
  return (
    <div>
      <Logo />
      <ForgotPasswordForm />

      <p style={{ fontWeight: '400', textAlign: 'center' }}>
        <Link to='/login' style={{ color: 'rgb(41, 43, 44)' }}>
          Ready to sign in?
        </Link>
      </p>
    </div>
  );
};

ForgotPasswordPage.propTypes = {};

export default ForgotPasswordPage;
