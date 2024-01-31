import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Cursor, useTypewriter } from 'react-simple-typewriter';

const Home = () => {
  const [text] = useTypewriter({
    words: ['Prime cuts!', 'Exceptional flavor!', 'We are BulNaMe!'],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <Box
      sx={{
        backgroundImage:
          'url("https://firebasestorage.googleapis.com/v0/b/bnm---shop.appspot.com/o/images%2FBulname%20-%20homepage.jpg?alt=media&token=ee257f61-d396-470a-9a49-a81b401a536b")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        color: '#fff',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        <span>{text}</span>
        <Cursor />
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Discover our premium quality beef products.
      </Typography>
      <Button variant="contained" color="primary">
        Explore Products
      </Button>
    </Box>
  );
};

export default Home;
