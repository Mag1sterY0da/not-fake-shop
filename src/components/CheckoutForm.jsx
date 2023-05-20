import { Box, Button, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import useReverseGeocoding from '../hooks/data/useReverseGeocoding';
import FormikField from './Inputs/FormikField';
import LoadingSpinner from './LoadingSpinner';

const CheckoutForm = () => {
  const { street, streetNumber, city, state, zipCode, isLoading } =
    useReverseGeocoding();

  const navigate = useNavigate();

  if (isLoading) return <LoadingSpinner />;

  const handleSubmit = () => {
    navigate('/success');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mb: '2.4rem' }}>
      <Typography variant='h5' sx={{ marginBottom: 2 }}>
        Checkout
      </Typography>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          street: street || '',
          streetNumber: streetNumber || '',
          city: city || '',
          state: state || '',
          zipCode: zipCode || '',
          phoneNumber: '',
          cardNumber: '',
          expiry: '',
          cvv: '',
        }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};
          Object.keys(values).forEach((field) => {
            switch (field) {
              case 'firstName':
              case 'lastName':
                if (!/^[a-zA-Z ]+$/.test(values[field])) {
                  errors[field] = `Invalid ${
                    field === 'firstName' ? 'first' : 'last'
                  } name`;
                }
                break;
              case 'streetNumber':
                if (!/^[0-9]+$/.test(values[field])) {
                  errors[field] = 'Invalid street number';
                }
                break;
              case 'zipCode':
                if (!/^\d{5}$/.test(values[field])) {
                  errors[field] = 'Invalid zip code';
                }
                break;
              case 'cardNumber':
                if (!/^\d{16}$/.test(values[field])) {
                  errors[field] = 'Invalid card number';
                }
                break;
              case 'expiry':
                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values[field])) {
                  errors[field] = 'Invalid MM/YY format';
                }
                break;
              case 'cvv':
                if (!/^\d{3}$/.test(values[field])) {
                  errors[field] = 'Invalid CVV';
                }
                break;
              default:
                if (!values[field]) {
                  errors[field] = 'Required';
                }
                break;
            }
          });
          return errors;
        }}
      >
        {() => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormikField name='firstName' label='First Name' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikField name='lastName' label='Last Name' />
              </Grid>
              <Grid item xs={12}>
                <FormikField name='street' label='Street' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikField name='streetNumber' label='Street Number' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikField name='city' label='City' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikField name='state' label='State' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikField name='zipCode' label='Zip Code' />
              </Grid>
              <Grid item xs={12}>
                <FormikField name='phoneNumber' label='Phone Number' />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  Payment Details
                </Typography>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  <FormikField name='cardNumber' label='Card Number' />
                  <Box sx={{ display: 'flex', gap: '16px' }}>
                    <FormikField name='expiry' label='Phone expiry' />
                    <FormikField name='cvv' label='CVV' />
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Button type='submit' variant='contained' color='primary'>
                  Place Order
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default CheckoutForm;
