import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import './SignupForm.scss';

const SignupForm = (props) => {
  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <div className='form-name'>
        <InputField
          name='fullname'
          label='Full name'
          form={form}
          placeholder='Hyun Bin'
        />

        <InputField
          name='username'
          label='User name'
          form={form}
          placeholder='hyunbin'
        />
      </div>

      <InputField
        name='email'
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

      <PasswordField
        name='re-password'
        label='Confirmation Password'
        form={form}
        type='password'
      />

      <div className='form-group'>
        <input
          type='checkbox'
          className='form-input-checkbox'
          id='rememberMe'
          name='rememberMe'
        />

        <label className='form-label' htmlFor='rememberMe'>
          Accept the term and the privacy policy
        </label>
      </div>

      <button type='submit' className='form-button'>
        Let's start
      </button>
    </form>
  );
};

SignupForm.propTypes = {};

export default SignupForm;
