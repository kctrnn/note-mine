import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './LoginForm.scss';

const LoginForm = (props) => {
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <InputField
        name='identifier'
        label='Email'
        form={form}
        placeholder='hyun@bin.com'
        type='email'
      />

      <PasswordField
        name='password'
        label='Password'
        form={form}
        type='password'
      />

      <Link className='form-forgot' to='/forgot-password'>
        Forgot your password?
      </Link>

      {/* Remember me */}
      <div className='form-group'>
        <input
          type='checkbox'
          className='form-input-checkbox'
          id='rememberMe'
          name='rememberMe'
        />

        <label className='form-label' htmlFor='rememberMe'>
          Remember me
        </label>
      </div>

      <button type='submit' className='form-button'>
        Log in
      </button>
    </form>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
