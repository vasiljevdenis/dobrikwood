import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Cart() {

  return (
    <Grid container>
      <Grid item xs={12} textAlign={window.innerWidth < 900 ? 'center' : 'left'}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 'auto'
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
            p: '2px 4px'
          }}>
            100 000 ₽
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <Button variant="contained" sx={{
            color: 'white',
            mt: 1
          }}>Корзина пуста</Button>
        </Box>
      </Grid>
    </Grid>
  );
}