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
  IconButton,
} from '@mui/material';
import Checkout from '../Checkout/Checkout';
import { getAllCartItems } from '../../Services/products.services';
import { auth } from '../../Config/firebase-config';
// import { Link } from 'react-router-dom';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const calculateTotal = (items) => {
    return items.reduce(
      (total, item) => total + item.price.slice(0, 2) * item.quantity,
      0
    );
  };

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
        const price = calculateTotal(productsData);
        setTotal(price);
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
          <Typography variant="h5">Total: {total}.00лв</Typography>
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
                        Price:{' '}
                        {Number(item.quantity) * Number(item.price.slice(0, 2))}
                        .00лв
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        Quantity: {item.quantity}
                      </Typography>
                      <IconButton>
                        <RemoveShoppingCartIcon key={item.id} />
                      </IconButton>
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
