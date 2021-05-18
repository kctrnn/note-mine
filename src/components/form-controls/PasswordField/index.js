import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

const PasswordField = (props) => {
  const { form, label, name, type, placeholder } = props;
  const { control } = form;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='form-group'>
      <label className='form-label' htmlFor={name}>
        {label}
      </label>

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
    </div>
  );
};

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

PasswordField.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
};

export default PasswordField;
