import { yupResolver } from '@hookform/resolvers/yup';
import CheckboxField from 'components/form-controls/CheckboxField';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './SignupForm.scss';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('This value is required.')
    .email('Please enter a valid email address'),

  password: yup
    .string()
    .required('This value is required.')
    .min(6, 'Please enter at least 6 characters.'),

  rePassword: yup
    .string()
    .required('This value is required.')
    .oneOf([yup.ref('password')], 'Password does not match.'),

  fullname: yup
    .string()
    .required('This value is required.')
    .test(
      'should has at least two words',
      'Please enter at least two words.',
      (value) => {
        return value.split(' ').length >= 2;
      }
    ),

  username: yup.string().required('This value is required.'),
  accept: yup.bool().isTrue('Please accept the term and the privacy policy.'),
});

const SignupForm = (props) => {
  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      rePassword: '',
      fullname: '',
      accept: false,
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
        name='rePassword'
        label='Confirmation Password'
        form={form}
        type='password'
      />

      <CheckboxField
        name='accept'
        label='Accept the term and the privacy policy'
        form={form}
      />

      <button type='submit' className='form-button' disabled={isSubmitting}>
        Let's start
      </button>
    </form>
  );
};

SignupForm.propTypes = {};

export default SignupForm;
