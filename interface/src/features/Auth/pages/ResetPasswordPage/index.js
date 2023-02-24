import Logo from 'components/Logo';
import ResetPasswordForm from 'features/Auth/components/ResetPasswordForm';
import React from 'react';
import { Link } from 'react-router-dom';

const ResetPasswordPage = () => {
  return (
    <div className='auth-reset' style={{ paddingTop: '5rem' }}>
      <Logo />
      <ResetPasswordForm />

      <p style={{ fontWeight: '400', textAlign: 'center' }}>
        <Link to='/login' tabIndex='-1' style={{ color: 'rgb(41, 43, 44)' }}>
          Ready to sign in?
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswordPage;
