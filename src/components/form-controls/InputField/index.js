import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

const InputField = (props) => {
  const { form, label, name, type, placeholder } = props;
  const { control } = form;

  return (
    <div className='form-group'>
      <label className='form-label' htmlFor={name}>
        {label}
      </label>

      <div className='form-input'>
        <span>
          <AlternateEmailIcon />
        </span>

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            // field: { name: '', value='', onChange: ƒ, onBlur: ƒ, ref: ƒ }
            <input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              autoComplete='off'
            />
          )}
        />
      </div>
    </div>
  );
};

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

InputField.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
};

export default InputField;
