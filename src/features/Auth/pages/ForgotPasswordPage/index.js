import Logo from 'components/Logo';
import ForgotPasswordForm from 'features/Auth/components/ForgotPasswordForm';
import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  return (
    <div className='auth-forgot' style={{ paddingTop: '5rem' }}>
      <Logo />
      <ForgotPasswordForm />

      <p style={{ fontWeight: '400', textAlign: 'center' }}>
        <Link to='/login' tabIndex='-1' style={{ color: 'rgb(41, 43, 44)' }}>
          Ready to sign in?
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
