import { ErrorMessage } from '@hookform/error-message';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

const CheckboxField = ({ form, label, name }) => {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <div className='form-group'>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input {...field} id={name} type='checkbox' className='form-input' />
        )}
      />

      <label className='form-label' htmlFor={name}>
        {label}
      </label>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className='form-error'>{message}</p>}
      />
    </div>
  );
};

CheckboxField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
};

CheckboxField.defaultProps = {
  label: '',
};

export default CheckboxField;
