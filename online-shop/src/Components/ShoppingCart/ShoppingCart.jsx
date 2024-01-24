import React, { useEffect, useState } from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Grid,
  Divider,
} from '@mui/material';
import Checkout from '../Checkout/Checkout';
import { getAllCartItems } from '../../Services/products.services';
import { auth } from '../../Config/firebase-config';
// import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  // Dummy data for demonstration purposes
  const [cartItems, setCartItems] = useState([]);

  //   const calculateTotal = () => {
  //     return cartItems.reduce(
  //       (total, item) => total + item.price * item.quantity,
  //       0
  //     );
  //   };

  //   function Copyright() {
  //     return (
  //       <Typography variant="body2" color="text.secondary" align="center">
  //         {'Copyright © '}
  //         <Link color="inherit" href="https://mui.com/">
  //           Your Website
  //         </Link>{' '}
  //         {new Date().getFullYear()}
  //         {'.'}
  //       </Typography>
  //     );
  //   }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllCartItems(auth?.currentUser?.uid);
        console.log('Data: ' + productsData);
        setCartItems(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5">Shopping Cart</Typography>
          <Divider style={{ margin: '10px 0' }} />
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar alt={item.title} src={item.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        Price: ${item.price}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        Quantity: {item.quantity}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Checkout />
      </Grid>
      {/* <Copyright /> */}
    </Grid>
  );
};

export default ShoppingCart;
