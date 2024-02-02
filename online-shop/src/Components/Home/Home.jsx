import React from 'react';
import {
  Box,
  Typography,
  Button,
  createTheme,
  alpha,
  getContrastRatio,
  ThemeProvider,
} from '@mui/material';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router';

const bnmBase = '#023620';
const bnmMain = alpha(bnmBase, 0.7);

const theme = createTheme({
  palette: {
    bnm: {
      main: bnmMain,
      light: alpha(bnmBase, 0.5),
      dark: alpha(bnmBase, 2),
      contrastText: getContrastRatio(bnmMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});

const Home = () => {
  const [text] = useTypewriter({
    words: ['Prime cuts!', 'Exceptional flavor!', 'We are BulNaMe!'],
    loop: true,
    delaySpeed: 2000,
  });
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            backgroundImage:
              'url("https://firebasestorage.googleapis.com/v0/b/bnm---shop.appspot.com/o/images%2FBulname%20-%20homepage.jpg?alt=media&token=ee257f61-d396-470a-9a49-a81b401a536b")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            filter: 'brightness(0.5)',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            height: '100%',
          }}
        />
        <Box
          sx={{
            color: '#fff',
            textAlign: 'center',
            zIndex: 1,

            marginBottom: '2rem',
          }}
        >
          <Typography variant="h1" align="center" gutterBottom>
            <span>{text}</span>
            <Cursor />
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Discover our premium quality beef products.
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: '20px',
              width: '200px',
            }}
          >
            <Button
              variant="contained"
              color="bnm"
              onClick={() => navigate('/products')}
            >
              Explore Products
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
