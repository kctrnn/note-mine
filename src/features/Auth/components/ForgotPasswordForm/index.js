import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/form-controls/InputField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter your email')
    .email('Please enter a valid email address'),
});

const ForgotPasswordForm = (props) => {
  const form = useForm({
    defaultValues: {
      email: '',
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
      <InputField
        name='email'
        label='Email'
        form={form}
        placeholder='hyun@bin.com'
        type='email'
      />

      <button type='submit' className='form-button' disabled={isSubmitting}>
        Send email
      </button>
    </form>
  );
};

ForgotPasswordForm.propTypes = {};

export default ForgotPasswordForm;
