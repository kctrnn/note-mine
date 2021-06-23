import { yupResolver } from '@hookform/resolvers/yup';
import PasswordField from 'components/form-controls/PasswordField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  password: yup
    .string()
    .required('This value is required.')
    .min(6, 'Please enter at least 6 characters.'),

  rePassword: yup
    .string()
    .required('This value is required.')
    .oneOf([yup.ref('password')], 'Password does not match.'),
});

const UpdateUserForm = () => {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      rePassword: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <PasswordField
        name='password'
        label='New password'
        form={form}
        type='password'
      />

      <PasswordField
        name='rePassword'
        label='Confirmation password'
        form={form}
        type='password'
      />

      <button type='submit' className='form-button' disabled={isSubmitting}>
        Update
      </button>
    </form>
  );
};

UpdateUserForm.propTypes = {};

export default UpdateUserForm;
