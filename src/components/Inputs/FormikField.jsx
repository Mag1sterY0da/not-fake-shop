import { TextField, Typography } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import PropTypes from 'prop-types';
import { memo } from 'react';

const FormikField = memo(({ name, label, type = 'text' }) => {
  return (
    <>
      <Field
        name={name}
        as={TextField}
        label={label}
        fullWidth
        required
        type={type}
      />
      <ErrorMessage name={name}>
        {(msg) => (
          <Typography variant='caption' color='error' style={{ marginTop: 4 }}>
            {msg}
          </Typography>
        )}
      </ErrorMessage>
    </>
  );
});

FormikField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
};

FormikField.displayName = 'FormikField';

export default FormikField;
