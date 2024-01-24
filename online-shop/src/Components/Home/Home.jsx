import React from 'react';
import homeImage from '../../Images/Bulname - homepage.jpg';

const Home = () => {
  return (
    <div>
      <img
        srcSet={`${homeImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        src={`${homeImage}?w=164&h=164&fit=crop&auto=format`}
        alt="Home"
        loading="lazy"
        style={{ maxWidth: '100%', height: 'auto' }}
      />

      <div>Home</div>
    </div>
  );
};

export default Home;
