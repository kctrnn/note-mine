import { ErrorMessage } from '@hookform/error-message';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

const PasswordField = (props) => {
  const { form, label, name, type, placeholder, isForgotMode } = props;
  const {
    control,
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='form-group'>
      <div className='form-header'>
        <label className='form-label' htmlFor={name}>
          {label}
        </label>

        {isForgotMode && (
          <Link className='form-forgot' to='/forgot-password' tabIndex='-1'>
            Forgot your password?
          </Link>
        )}
      </div>

      <div className='form-input'>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id={name}
              type={showPassword ? 'text' : type}
              placeholder={placeholder}
              autoComplete='off'
              className='password'
            />
          )}
        />

        <span onClick={() => setShowPassword((x) => !x)}>
          <VisibilityIcon />
        </span>
      </div>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className='form-error'>{message}</p>}
      />
    </div>
  );
};

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  isForgotMode: PropTypes.bool,
};

PasswordField.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  isForgotMode: false,
};

export default PasswordField;
