import * as React from 'react';
import { useEffect } from 'react';
import { getAllProducts } from '../../Services/products.services';
import ProductsView from '../ProductsView/ProductsView';
import { useParams } from 'react-router';
import { Box, Typography } from '@mui/material';

export default function Search() {
  const [results, setResults] = React.useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = params.query.trim().toLowerCase();
        const productsData = await getAllProducts();
        let productsMatchingQuery = [];
        for (const item of productsData) {
          if (
            item.description.toLowerCase().includes(q) ||
            item.title.toLowerCase().includes(q)
          ) {
            productsMatchingQuery.push(item);
          }
        }
        setResults(productsMatchingQuery);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [params.query]);
  if (results.length > 0) {
    return <ProductsView products={results} />;
  }
  return (
    <Box>
      <Typography>No matching results for {params.query}</Typography>
    </Box>
  );
}
