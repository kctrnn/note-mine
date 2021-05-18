import Logo from 'components/Logo';
import LoginForm from 'features/Auth/components/LoginForm';
import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      <Logo />
      <LoginForm />

      <p style={{ fontWeight: '400', textAlign: 'center' }}>
        Not a member? <Link to='/signup'>Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
