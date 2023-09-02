import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import InfoIcon from '@mui/icons-material/Info';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ReviewsIcon from '@mui/icons-material/Reviews';
import BedroomBabyIcon from '@mui/icons-material/BedroomBaby';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import StorageIcon from '@mui/icons-material/Storage';
import CategoryIcon from '@mui/icons-material/Category';
import KingBedIcon from '@mui/icons-material/KingBed';

const MobileMenu = () => {

    const [state, setState] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState(open);
    };

    const items = [
        {
            title: 'Главная',
            url: '/',
            icon: <HomeIcon />
        },
        {
            title: 'Каталог',
            url: '/catalog',
            icon: <ListIcon />
        },
        {
            title: 'О нас',
            url: '',
            icon: <InfoIcon />
        },
        {
            title: 'Доставка и оплата',
            url: '',
            icon: <LocalShippingIcon />
        },
        {
            title: 'Контакты',
            url: '',
            icon: <ContactPhoneIcon />
        },
        {
            title: 'Отзывы',
            url: '',
            icon: <ReviewsIcon />
        }
    ];

    const categories = [
        {
            title: 'Лошадки-качалки',
            url: '/',
            icon: <BedroomBabyIcon />
        },
        {
            title: 'Столы и стулья',
            url: '',
            icon: <EventSeatIcon />
        },
        {
            title: 'Комоды и стеллажи',
            url: '',
            icon: <BorderAllIcon />
        },
        {
            title: 'Тумбочки',
            url: '',
            icon: <StorageIcon />
        },
        {
            title: 'Игрушки',
            url: '',
            icon: <CategoryIcon />
        },
        {
            title: 'Мебель на заказ',
            url: '',
            icon: <KingBedIcon />
        }
    ];

    const list = () => (
        <Box
            sx={{ width: '70vw' }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {items.map((el, index) => (
                    <ListItem key={el + index} disablePadding component={RouterLink} to={el.url}>
                        <ListItemButton>
                            <ListItemIcon sx={{
                                color: '#60a47c'
                            }}>
                                {el.icon}
                            </ListItemIcon>
                            <ListItemText primary={el.title} sx={{
                                color: '#212529',
                                textTransform: 'uppercase',
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                }
                            }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {categories.map((el, index) => (
                    <ListItem key={el + index} disablePadding component={RouterLink} to={el.url}>
                        <ListItemButton>
                            <ListItemIcon sx={{
                                color: '#60a47c'
                            }}>
                                {el.icon}
                            </ListItemIcon>
                            <ListItemText primary={el.title} sx={{
                                color: '#212529',
                                textTransform: 'uppercase',
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                }
                            }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <IconButton
                variant="raised"
                aria-label="Instagram"
                size="large"
                color='primary'
                onClick={toggleDrawer(true)}
                sx={{
                    background: 'white',
                    padding: 1,
                    '&:hover': {
                        background: 'white'
                    }
                }}>
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                anchor='right'
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
        </>
    )
};

export default MobileMenu;