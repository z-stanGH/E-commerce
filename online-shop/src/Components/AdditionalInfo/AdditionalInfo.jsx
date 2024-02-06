import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../Services/products.services';

const AdditionalInfo = () => {
  const params = useParams();
  const [product, setProduct] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const item = await getProductById(Number(params.itemId));

        setProduct(item);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProduct();
  }, [params.itemId]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <img
          src={product[0]?.info?.image}
          alt="Sample"
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '500px',
            objectFit: 'cover',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" sx={{ paddingLeft: 2 }}>
          Полезна информация за продукта
        </Typography>
        <Typography sx={{ padding: 2 }}>
          {product[0]?.info?.description}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h5" sx={{ paddingLeft: 2 }}>
          Откъде идва месото
        </Typography>
        <Typography sx={{ padding: 2 }}>{product[0]?.info?.cut}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <img
          src={product[0]?.info?.diagram}
          alt="Sample"
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '500px',
            objectFit: 'cover',
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> 100g serving</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  {product[0]?.title}
                </TableCell>
                <TableCell align="right">
                  {product[0]?.info?.calories}
                </TableCell>
                <TableCell align="right">{product[0]?.info?.fats}</TableCell>
                <TableCell align="right">{product[0]?.info?.carbs}</TableCell>
                <TableCell align="right">
                  {product[0]?.info?.proteins}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default AdditionalInfo;
