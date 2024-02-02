import * as React from 'react';
import { useEffect } from 'react';
import ProductsView from '../ProductsView/ProductsView';
import { getAllProducts } from '../../Services/products.services';

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

  return <ProductsView products={products} />;
}
