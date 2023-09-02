import { Box, Link, List, ListItem, ListItemText } from '@mui/material';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Sidebar() {

    const listItemStyle = {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        color: '#212529',
        py: 0
    };

    return (
        <Box sx={{ p: 0 }}>
            <List dense={false} sx={{p: 0}}>
                <ListItem sx={{...listItemStyle, background: '#60a47c'}} secondaryAction={<ArrowDropDownIcon sx={{color: 'white', verticalAlign: 'middle'}} />}>
                    <Link sx={{color: 'white', textTransform: 'uppercase'}} component={RouterLink} to="/catalog" underline="none">
                        <ListItemText       
                            primary="Все товары"
                            sx={{
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                  }                                
                            }}
                        />
                    </Link>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <Link sx={{color: '#212529', textTransform: 'uppercase'}} component={RouterLink} to="/" underline="none">
                        <ListItemText
                            primary="Лошадки-качалки"
                            sx={{
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                  }                                
                            }}
                        />
                    </Link>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <Link sx={{color: '#212529', textTransform: 'uppercase'}} component={RouterLink} to="/" underline="none">
                        <ListItemText
                            primary="Столы и стулья"
                            sx={{
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                  }                                
                            }}
                        />
                    </Link>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <Link sx={{color: '#212529', textTransform: 'uppercase'}} component={RouterLink} to="/" underline="none">
                        <ListItemText
                            primary="Комоды и стеллажи"
                            sx={{
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                  }                                
                            }}
                        />
                    </Link>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <Link sx={{color: '#212529', textTransform: 'uppercase'}} component={RouterLink} to="/" underline="none">
                        <ListItemText
                            primary="Тумбочки"
                            sx={{
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                  }                                
                            }}
                        />
                    </Link>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <Link sx={{color: '#212529', textTransform: 'uppercase'}} component={RouterLink} to="/" underline="none">
                        <ListItemText
                            primary="Игрушки"
                            sx={{
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                  }                                
                            }}
                        />
                    </Link>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <Link sx={{color: '#212529', textTransform: 'uppercase'}} component={RouterLink} to="/" underline="none">
                        <ListItemText
                            primary="Мебель на заказ"
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