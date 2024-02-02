import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Backdrop, Button, ButtonBase, Grid, Tooltip } from '@mui/material';
import { addToCart } from '../../Services/products.services';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { auth } from '../../Config/firebase-config';
import DetailedInfo from '../DetailedInfo/DetailedInfo';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductsView({ products }) {
  const [expanded, setExpanded] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleExpandClick = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ padding: 2 }}
    >
      {products
        .sort(function (a, b) {
          const keyA = a.id,
            keyB = b.id;
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        })
        .map((item, index) => (
          <Grid item key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                sx={{ color: '#023620' }}
                action={
                  <ButtonBase>
                    <Button sx={{ color: '#CD8E33' }} onClick={handleOpen}>
                      Details
                    </Button>
                    <Backdrop
                      sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                      }}
                      open={open}
                      onClick={handleClose}
                    >
                      {/* <CircularProgress color="inherit" /> */}
                      <DetailedInfo
                        userId={auth?.currentUser?.uid}
                        itemId={item.id}
                      />
                    </Backdrop>
                  </ButtonBase>
                }
                title={item.title}
                subheader={item.subtitle}
              />
              <CardMedia
                component="img"
                height="194"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Tooltip disableFocusListener title="Add to cart">
                  <IconButton
                    aria-label="add to cart"
                    onClick={() => addToCart(auth?.currentUser?.uid, item.id)}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </Tooltip>
                <Typography>{item.price}</Typography>
                <ExpandMore
                  expand={expanded[index]}
                  onClick={() => handleExpandClick(index)}
                  aria-expanded={expanded[index]}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                <CardContent>{item.facts}</CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}
