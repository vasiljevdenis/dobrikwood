import { Badge, Box, Button, Card, CardActionArea, CardContent, CardMedia, Divider, Grid, IconButton, LinearProgress, Rating, Typography } from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from 'react-router-dom';
import axios from "axios";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { observer } from "mobx-react-lite";
import appState from "../store/appState";

const Cart = observer(() => {

    const [store] = React.useState(appState);

    const cart = JSON.parse(localStorage.getItem('cart')) || {
        updated_at: new Date(),
        cartTotal: 0,
        goods: {}
    };

    const [cartState, setCartState] = React.useState({ ...cart });
    const [goods, setGoods] = React.useState([]);

    const [progress, setProgress] = React.useState(true);

    React.useEffect(() => {
        setProgress(true);
        axios.post(import.meta.env.VITE_APP_BASE_URL + '/api/cart/goods', {
            goods: Object.keys(cartState.goods)
        })
            .then(res => {
                let json = res.data;
                setGoods(json);
                setProgress(false);
            })
            .catch(err => {
            })

            .finally(() => {
            });
    }, [cartState]);

    // Функция для обновления корзины в localStorage
    const updateCart = (c) => {
        c.updated_at = new Date();
        const cartTotal = Object.values(c.goods).map(item => item.totalPrice).reduce((a, b) => a + b, 0);
        c.cartTotal = cartTotal;
        localStorage.setItem('cart', JSON.stringify(c));
        setCartState({ ...c });
        store.changeCartTotal(cartTotal);
    };

    // Обработчик клика на кнопке "Удалить"
    const removeFromCart = (productId) => {
        let c = { ...cartState };
        delete c.goods[productId];
        updateCart(c);
    };

    // Обработчик клика на кнопке "Минус"
    const decreaseQuantity = (productId, price) => {
        let c = { ...cartState };
        if (c.goods[productId].count >= 2) {
            c.goods[productId].count--;
            c.goods[productId].price = price;
            c.goods[productId].totalPrice -= price;
            updateCart(c);
        } else {
            removeFromCart(productId);
        }
    };

    // Обработчик клика на кнопке "Плюс"
    const increaseQuantity = (productId, price) => {
        let c = { ...cartState };
        c.goods[productId].count++;
        cart.goods[productId].price = price;
        c.goods[productId].totalPrice += price;
        updateCart(c);
    };

    return (
        <>
            {progress ? (<LinearProgress color="primary" />) : (
                <>
                    <Typography variant="h4" component="h2" m={2}>
                        Корзина
                    </Typography>
                    <Grid container p={1} textAlign={'center'}>
                        {
                            goods.map((el, i) => {
                                return (
                                    <Grid key={'product' + i} item xs={12} p={1}>
                                        <Badge sx={{ '& .MuiBadge-badge': { p: 0 }, width: '100%' }} badgeContent={<IconButton sx={{ p: 0 }} title="Удалить" onClick={() => removeFromCart(el.id)}><CloseIcon fontSize="small" sx={{ color: 'white' }} /></IconButton>} color="error">
                                            <Card sx={{ display: 'flex', width: '100%' }}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ width: 150 }}
                                                    image={import.meta.env.VITE_APP_BASE_URL + '/storage/images/' + el.category + '/' + el.path + '1.jpg'}
                                                    alt={el.name}
                                                />
                                                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                                        <Typography component="div" variant="h5">
                                                            {el.name}
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                                            Код товара: {el.id}
                                                        </Typography>
                                                    </CardContent>
                                                </Box>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', textAlign: 'left', alignItems: 'center', ml: 'auto' }}>
                                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                                        <Typography component="div" variant="subtitle1">
                                                            {el.price === 0 ? '' : el.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="text.secondary" component="div">
                                                            <del>{el.lastPrice === 0 ? '' : el.lastPrice.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</del>
                                                        </Typography>
                                                    </CardContent>
                                                </Box>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', textAlign: 'left', alignItems: 'center' }}>
                                                    <IconButton color="primary" aria-label="Minus button" onClick={() => decreaseQuantity(el.id, el.price)}>
                                                        <RemoveCircleIcon />
                                                    </IconButton>
                                                    <Typography variant="h6" component="span" sx={{
                                                        border: '1px solid rgba(0,0,0,0.14)',
                                                        px: 1.5,
                                                        py: 0.1,
                                                        verticalAlign: 'middle'
                                                    }}>{cartState.goods[el.id].count}</Typography>
                                                    <IconButton color="primary" aria-label="Plus button" onClick={() => increaseQuantity(el.id, el.price)}>
                                                        <AddCircleIcon />
                                                    </IconButton>
                                                </Box>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', textAlign: 'left', alignItems: 'center' }}>
                                                    <Typography variant="h5" component="span" sx={{
                                                        px: 1.5,
                                                        py: 0.1,
                                                        verticalAlign: 'middle',
                                                        backgroundColor: 'primary.main',
                                                        color: 'white',
                                                        minWidth: '130px',
                                                        textAlign: 'center'
                                                    }}>{cartState.goods[el.id].totalPrice.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</Typography>
                                                </Box>
                                            </Card>
                                        </Badge>
                                    </Grid>
                                );
                            })
                        }
                        <Grid item xs={12} p={1} textAlign={'right'}>
                            <Typography variant="h4" component="span" gutterBottom sx={{
                                px: 1.5,
                                py: 0.1,
                                verticalAlign: 'middle'
                            }}>Итого: {cartState.cartTotal.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</Typography>
                        </Grid>
                        <Grid item xs={12} p={1} textAlign={'right'}>
                            <Button component={RouterLink} to="/checkout" variant="contained" sx={{
                                color: 'white',
                                mt: 1,
                                "&.Mui-disabled": {
                                    backgroundColor: "primary.main",
                                    color: "white"
                                }
                            }}>Перейти к оформлению</Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    )
});
export default Cart;