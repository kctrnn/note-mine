import Logo from 'components/Logo';
import LoginForm from 'features/Auth/components/LoginForm';
import React from 'react';

const LoginPage = () => {
  return (
    <div>
      <Logo />
      <LoginForm />

      <p style={{ fontWeight: '400', textAlign: 'center' }}>
        Forgot your password?
      </p>
    </div>
  );
};

export default LoginPage;
