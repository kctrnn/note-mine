import { yupResolver } from '@hookform/resolvers/yup';
import PasswordField from 'components/form-controls/PasswordField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  password: yup.string(),
  rePassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password does not match.'),
});

const UpdateUserForm = ({ onSubmit }) => {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      rePassword: '',
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleSubmit = async (values) => {
    if (onSubmit) {
      if (values.password === '') {
        await onSubmit({});
      } else {
        await onSubmit(values);
      }
    }

    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className='form'>
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
