// import './bootstrap';
import style from '../sass/app.scss'

import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, Grid, ThemeProvider, createTheme } from '@mui/material';
import Home from './Pages/Home';
// import About from './Pages/About';
// import Feedback from './Pages/Feedback';
import Error404 from './Pages/Error404';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Sidebar from './Components/Sidebar';
import Horizontalbar from './Components/Horizontalbar';
import Catalog from './Pages/Catalog';
import Category from './Pages/Category';
import Product from './Pages/Product';
import AppState from './store/AppState';
import Cart from './Pages/Cart';

const newTheme = createTheme({
  palette: {
    primary: {
      main: '#60a47c',
    }
  },
  typography: {
    fontFamily: [
      "FuturaPTDemi",
      'sans-serif'
    ].join(','),
    body1: {
      fontFamily: 'Helvetica, sans-serif'
    },
    body2: {
      fontFamily: 'Helvetica, sans-serif'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: style,
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: '#60a47c'
          },
          "& input::placeholder": {
            verticalAlign: 'middle'
          }
        }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('app')).render(
  <BrowserRouter>
    <ThemeProvider theme={newTheme}>
      <CssBaseline />
      <AppState />
      <Header />
      <Grid container>
        <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' }, background: '#f8f3ef' }} textAlign={'center'}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={9} minHeight={500}>
          <Horizontalbar />
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/about' element={<About />} /> */}
            {/* <Route path='/feedback' element={<Feedback />} /> */}
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/catalog/:categoryName' element={<Category />} />
            <Route path='/catalog/:categoryName/:productName' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  </BrowserRouter>
);