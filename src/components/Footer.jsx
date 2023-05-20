import { Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();

  return (
    <Container sx={{ bgcolor: '#fafafa', py: 6 }} maxWidth='xl'>
      <Grid container spacing={3} justify='center'>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h6' gutterBottom>
            About Us
          </Typography>
          <Typography variant='body1' gutterBottom>
            We are a Not Fake Shop based on the fakestoreapi, offering a wide
            range of high-quality products at competitive prices.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h6' gutterBottom>
            Customer Service
          </Typography>
          <Typography variant='body1' gutterBottom>
            <Link to='/' style={theme.links.primary}>
              Contact Us
            </Link>
          </Typography>
          <Typography variant='body1' gutterBottom>
            <Link to='/' style={theme.links.primary}>
              Return Policy
            </Link>
          </Typography>
          <Typography variant='body1' gutterBottom>
            <Link to='/' style={theme.links.primary}>
              FAQ
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h6' gutterBottom>
            Connect With Us
          </Typography>
          <Typography variant='body1' gutterBottom>
            <Link to='/' style={theme.links.primary}>
              Twitter
            </Link>
          </Typography>
          <Typography variant='body1' gutterBottom>
            <Link to='/' style={theme.links.primary}>
              Facebook
            </Link>
          </Typography>
          <Typography variant='body1' gutterBottom>
            <Link to='/' style={theme.links.primary}>
              Instagram
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
