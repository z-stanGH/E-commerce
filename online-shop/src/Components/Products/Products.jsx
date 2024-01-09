import { ImageList, ImageListItem } from '@mui/material';
import React from 'react';

const imagesContext = require.context(
  '../../Products-images',
  false,
  /\.(jpg)$/
);

const imageFileNames = imagesContext.keys();

const imagesArray = imageFileNames.map((fileName) => imagesContext(fileName));

const Products = () => {
  const numColumns = 3;
  const viewportWidth = window.innerWidth;
  const rowHeight = Math.floor((viewportWidth / numColumns) * 0.75);

  return (
    <ImageList
      sx={{ width: '100%', height: '100vh' }}
      cols={numColumns}
      rowHeight={rowHeight}
    >
      {imagesArray.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default Products;
