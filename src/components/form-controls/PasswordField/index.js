import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

const PasswordField = (props) => {
  const { form, label, name, type, placeholder } = props;
  const { control } = form;

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
              type={type}
              placeholder={placeholder}
              autoComplete='off'
            />
          )}
        />

        <VisibilityIcon />
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
