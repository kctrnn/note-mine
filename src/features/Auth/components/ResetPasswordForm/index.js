import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import PasswordField from 'components/form-controls/PasswordField';

const schema = yup.object().shape({
  password: yup
    .string()
    .required('This value is required.')
    .min(6, 'Please enter at least 6 characters.'),

  passwordConfirmation: yup
    .string()
    .required('This value is required.')
    .oneOf([yup.ref('password')], 'Password does not match.'),
});

const ResetPasswordForm = () => {
  const form = useForm({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },

    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <PasswordField
        name='password'
        label='Password'
        form={form}
        type='password'
      />

      <PasswordField
        name='passwordConfirmation'
        label='Confirmation Password'
        form={form}
        type='password'
      />

      <button type='submit' className='form-button' disabled={isSubmitting}>
        Send email
      </button>
    </form>
  );
};

ResetPasswordForm.propTypes = {};

export default ResetPasswordForm;
