import * as React from 'react';
import { useEffect } from 'react';
import ProductsView from '../ProductsView/ProductsView';
import { getAllProducts } from '../../Services/products.services';
import { Box, Typography } from '@mui/material';

export default function RecipeReviewCard() {
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Typography variant="h3" sx={{ color: '#023620' }}>
          Explore our quality products
        </Typography>
      </Box>
      <ProductsView products={products} />
    </div>
  );
}
