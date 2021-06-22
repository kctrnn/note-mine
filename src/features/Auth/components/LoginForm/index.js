import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
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

const useStyles = makeStyles((theme) => ({
  progress: {
    position: 'absolute',
    top: '-4px',
    left: 0,
    right: 0,
  },
}));

const LoginForm = ({ onSubmit }) => {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className='form'>
      {isSubmitting && <LinearProgress className={classes.progress} />}

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

      {/* <CheckboxField name='rememberMe' label='Remember me' form={form} /> */}

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
