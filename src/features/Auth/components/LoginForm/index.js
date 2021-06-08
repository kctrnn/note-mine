import { yupResolver } from '@hookform/resolvers/yup';
import CheckboxField from 'components/form-controls/CheckboxField';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './LoginForm.scss';

const schema = yup.object().shape({
  identifier: yup
    .string()
    .required('Please enter your email')
    .email('Please enter a valid email address'),
  password: yup.string().required('Please enter your password'),
});

const LoginForm = ({ onSubmit }) => {
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  // const onSubmit = (data) => console.log(data);

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
        isForgotMode
      />

      <CheckboxField name='rememberMe' label='Remember me' form={form} />

      <button type='submit' className='form-button' disabled={isSubmitting}>
        Log in
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  onSubmit: null,
};

export default LoginForm;
