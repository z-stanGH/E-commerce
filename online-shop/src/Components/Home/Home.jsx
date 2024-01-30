import React from 'react';
import homeImage from '../../Images/Bulname - homepage.jpg';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ backgroundColor: '#023620' }}>
      <img
        srcSet={`${homeImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        src={`${homeImage}?w=164&h=164&fit=crop&auto=format`}
        alt="Home"
        loading="lazy"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </Box>
  );
};

export default Home;
