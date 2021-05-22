import { ErrorMessage } from '@hookform/error-message';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';

const InputField = (props) => {
  const { form, label, name, type, placeholder } = props;
  const {
    control,
    formState: { errors },
  } = form;

  const formInputClass = classNames('form-input', {
    [`is-invalid`]: !!errors[name],
  });

  return (
    <div className='form-group'>
      <label className='form-label' htmlFor={name}>
        {label}
      </label>

      <div className={formInputClass}>
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

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className='form-error'>{message}</p>}
      />
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
