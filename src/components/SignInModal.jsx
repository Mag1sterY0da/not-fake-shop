import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import FormikField from './Inputs/FormikField';

const SignInModal = ({ toggleDialog, setToggleDialog }) => {
  return (
    <Dialog open={toggleDialog} onClose={() => setToggleDialog(false)}>
      <DialogTitle sx={{ textAlign: 'center' }}>Sign In</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: '1.2rem' }}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validate={(values) => {
              const errors = {};

              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }

              if (!values.password) {
                errors.password = 'Required';
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              // Handle sign-in logic here
              console.log(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormikField name='email' label='Email' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormikField
                      name='password'
                      label='Password'
                      type='password'
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type='submit' disabled={isSubmitting} fullWidth>
                      Sign In / Register
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setToggleDialog(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

SignInModal.propTypes = {
  toggleDialog: PropTypes.bool,
  setToggleDialog: PropTypes.func,
};

export default SignInModal;
