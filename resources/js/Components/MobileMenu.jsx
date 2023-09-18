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
import WeekendIcon from '@mui/icons-material/Weekend';
import { observer } from "mobx-react-lite";
import appState from "../store/appState";

const MobileMenu = observer(() => {

    const [store] = React.useState(appState);

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
            url: '/about',
            icon: <InfoIcon />
        },
        {
            title: 'Доставка и оплата',
            url: '/delivery',
            icon: <LocalShippingIcon />
        },
        {
            title: 'Контакты',
            url: '/contact',
            icon: <ContactPhoneIcon />
        },
        {
            title: 'Отзывы',
            url: '/reviews',
            icon: <ReviewsIcon />
        }
    ];

    const categories = [
        <BedroomBabyIcon />,
        <EventSeatIcon />,
        <BorderAllIcon />,
        <StorageIcon />,
        <CategoryIcon />,
        <KingBedIcon />
    ];

    const openCustomOrderModal = () => {
        store.openCustomOrderModal();
    }

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
                {store.allCategories.map((el, index) => (
                    <ListItem key={'categorynav' + index} disablePadding component={RouterLink} to={"/catalog/" + el.path}>
                        <ListItemButton>
                            <ListItemIcon sx={{
                                color: '#60a47c'
                            }}>
                                {categories[index]}
                            </ListItemIcon>
                            <ListItemText primary={el.name} sx={{
                                color: '#212529',
                                textTransform: 'uppercase',
                                "& span": {
                                    fontFamily: 'FuturaPTDemi, sans-serif'
                                }
                            }} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{
                            color: '#60a47c'
                        }}>
                            {<WeekendIcon />}
                        </ListItemIcon>
                        <ListItemText primary={'Мебель на заказ'} sx={{
                            color: '#212529',
                            textTransform: 'uppercase',
                            "& span": {
                                fontFamily: 'FuturaPTDemi, sans-serif'
                            }
                        }}
                        onClick={openCustomOrderModal}
                         />
                    </ListItemButton>
                </ListItem>
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
});
export default MobileMenu;