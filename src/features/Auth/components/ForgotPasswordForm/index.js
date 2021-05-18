import InputField from 'components/form-controls/InputField';
import React from 'react';
import { useForm } from 'react-hook-form';

const ForgotPasswordForm = (props) => {
  const form = useForm({
    defaultValues: {
      email: '',
    },
  });

  const { handleSubmit } = form;

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

      <button type='submit' className='form-button'>
        Send email
      </button>
    </form>
  );
};

ForgotPasswordForm.propTypes = {};

export default ForgotPasswordForm;
