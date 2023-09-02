import { Box, Link, List, ListItem, ListItemText, Stack } from '@mui/material';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function Horizontalbar() {

  const listItemStyle = {
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    color: '#212529',
    py: 0.07,
    width: 'auto'
};

  return (
    <Box sx={{background: '#b49c83', p: 0, display: { xs: 'none', sm: 'block' }}}>
        <List component={Stack} direction="row" dense={false} sx={{p: 0}}>
                <ListItem sx={listItemStyle}>
                    <Link sx={{color: 'white', textTransform: 'uppercase'}} component={RouterLink} to="/" underline="none">
                        <ListItemText
                            primary="Главная"
                            sx={{
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                  }                                                          
                            }}
                        />
                    </Link>
                </ListItem>
                <ListItem sx={{...listItemStyle, display: { xs: 'block', md: 'none' }}}>
                    <Link sx={{color: 'white', textTransform: 'uppercase'}} component={RouterLink} to="/catalog" underline="none">
                        <ListItemText
                            primary="Каталог"
                            sx={{
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                  }                                                          
                            }}
                        />
                    </Link>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <Link sx={{color: 'white', textTransform: 'uppercase'}} component={RouterLink} to="/" underline="none">
                        <ListItemText
                            primary="О нас"
                            sx={{
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                  }                                                          
                            }}
                        />
                    </Link>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <Link sx={{color: 'white', textTransform: 'uppercase'}} component={RouterLink} to="/" underline="none">
                        <ListItemText
                            primary="Доставка и оплата"
                            sx={{
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                  }                                                          
                            }}
                        />
                    </Link>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <Link sx={{color: 'white', textTransform: 'uppercase'}} component={RouterLink} to="/" underline="none">
                        <ListItemText
                            primary="Контакты"
                            sx={{
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                  }                                                          
                            }}
                        />
                    </Link>
                </ListItem>
                <ListItem sx={{...listItemStyle, borderRight: 'none'}}>
                    <Link sx={{color: 'white', textTransform: 'uppercase'}} component={RouterLink} to="/" underline="none">
                        <ListItemText
                            primary="Отзывы"
                            sx={{
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                  }                                                          
                            }}
                        />
                    </Link>
                </ListItem>
            </List>
    </Box>
  );
}