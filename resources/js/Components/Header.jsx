import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Typography } from '@mui/material';
import logo from '../../images/logo.svg';
import texture from '../../images/texture.jpg';
import Cart from './Cart';
import Search from './Search';
import MobileMenu from './MobileMenu';

const Header = () => {

  return (
    <Grid container alignItems={'center'} py={2} sx={{
      background: `url(${texture})`,
      backgroundSize: 'cover'
    }}>
      <Grid item xs={3} textAlign={'center'}>
        <Link component={RouterLink} to="/" sx={{
          marginRight: 'auto !important',
          marginLeft: 'auto',
          backgroundColor: 'white',
          borderRadius: '50%',
          padding: '0 !important',
          display: 'inline-block',
          height: '100px',
          width: '100px'
        }}>
          <img src={logo} width={100} height={100} style={{ objectFit: 'cover', objectPosition: '0 -16px' }} />
        </Link>
      </Grid>
      <Grid item xs={7} sm={6} textAlign={'left'} sx={{ pl: '0' }}>
        <Grid container>
          <Grid item xs={12} sx={{ display: { xs: 'none', sm: 'block' } }} textAlign={'left'}>
            <Typography variant="h3" component="h1" sx={{
              typography: {
                xs: 'h6',
                md: 'h3'
              }
            }} color="white" gutterBottom>
              СЕМЕЙНАЯ МАСТЕРСКАЯ
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign={'left'} sx={{ display: 'flex', alignItems: 'center' }}>
            <Search />
            <Link variant='h6' underline="none" href="tel:+79196628330" sx={{
              display: 'inline-block',
              verticalAlign: 'middle',
              color: 'white',
              background: '#60a47c',
              ml: {xs: 'auto', md: '54px'},
              padding: 1,
              borderRadius: '4px',
              transition: 'all 1.2s cubic-bezier(.4, 0, 0, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                background: '#fff',
                content: '""',
                height: '50px',
                left: '-75px',
                opacity: '.2',
                position: 'absolute',
                top: '0',
                transition: 'all .55s cubic-bezier(.19,1,.22,1)',
                width: '25px',
                zIndex: '10',
                animation: 'btn-highlight 5s infinite'
              }
            }}>
              <LocalPhoneIcon sx={{
                verticalAlign: 'sub'
              }} />
              &nbsp;
              <Typography variant="h6" component="span" color="white" sx={{
                display: 'inline-block',
                typography: {
                  xs: 'body1',
                  sm: 'h6'
                }
              }}>
                +7 919 662 83 30
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} sm={3} textAlign={'left'} alignSelf={'end'}>
        <Cart />
      </Grid>
      <Grid item xs={2} sm={3} sx={{ display: { xs: 'block', sm: 'none' } }} textAlign={'center'} alignSelf={'center'}>
        <MobileMenu />
      </Grid>
    </Grid>
  );
};
export default Header;