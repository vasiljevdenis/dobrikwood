import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { observer } from 'mobx-react-lite';
import appState from '../store/appState';

const Cart = observer(() => {

  const [store] = React.useState(appState);

  return (
    <Grid container sx={{
      position: {
        xs: 'fixed',
        sm: 'static'
      },
      bottom: 1,
      right: 1,
      zIndex: {
        xs: 1201,
        sm: 'auto'
      }
    }}>
      <Grid item xs={12} textAlign={window.innerWidth < 900 ? 'center' : 'left'}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 'auto',
          justifyContent: {
            xs: 'flex-end',
            sm: 'normal'
          }          
        }}>
          <IconButton variant="raised" aria-label="Instagram" size="large" color='primary' component={RouterLink} to="/cart" sx={{
            background: 'white',
            padding: 1,
            '&:hover': {
              background: 'white'
            }
          }}>
            <ShoppingCartIcon />
          </IconButton>
          <Typography variant="h6" component="span" color="white" sx={{
            background: '#60a47c',
            borderRadius: '4px',
            minWidth: '95.45px',
            ml: 0.7,
            p: '2px 4px',
            textAlign: 'center'
          }}>
            {store.cartTotalVal.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ₽
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <Button component={RouterLink} to="/cart" variant="contained" disabled={store.cartTotalVal > 0 ? false : true} sx={{
            color: 'white',
            mt: 1,
            "&.Mui-disabled": {
              background: "#60a47c",
              color: "white"
            }
          }}>{store.cartTotalVal > 0 ? "Оформить заказ" : "Корзина пуста"}</Button>
        </Box>
      </Grid>
    </Grid>
  );
});
export default Cart;