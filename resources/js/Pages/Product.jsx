import * as React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActionArea, CardContent, CardMedia, Divider, Grid, IconButton, LinearProgress, Rating, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import img4 from '../../images/igrushki.jpg';
import { useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "../Components/Carousel";
import appState from "../store/appState";
import { observer } from "mobx-react-lite";
import RandomGoods from "../Components/RandomGoods";

const Product = observer(() => {

    const [store] = React.useState(appState);

    const [expanded, setExpanded] = React.useState('panel1');

    const [product, setProduct] = React.useState({});

    const [progress, setProgress] = React.useState(true);

    const [count, setCount] = React.useState(0);

    const [rate, setRate] = React.useState(0);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const { categoryName, productName } = useParams();

    React.useEffect(() => {
        setProgress(true);
        axios.get(import.meta.env.VITE_APP_BASE_URL + '/api/catalog/' + categoryName + '/' + productName)
            .then(res => {
                let json = res.data[0];
                setProduct(json);
                setRate(product.rate);
                setCount(JSON.parse(localStorage.getItem('cart'))?.goods[json.id]?.count || 0);
                setProgress(false);
            })
            .catch(err => {
            })
            .finally(() => {
            });
    }, [categoryName, productName]);

    const notify = (severity, text) => {
        store.openSnackbar(severity, text);;
    }

    const changeRate = (newValue) => {
        if (localStorage.getItem('rate') && localStorage.getItem('rate') === 'true') {
            notify('error', 'Вы уже голосовали!');
        } else {
            axios.post(import.meta.env.VITE_APP_BASE_URL + '/api/catalog/' + categoryName + '/' + productName + '/rate',
                {
                    id: product.id,
                    rate: newValue
                })
                .then(res => {
                    localStorage.setItem('rate', 'true');
                    notify('success', 'Спасибо за оценку!');
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                });
        }
    }


    const cart = JSON.parse(localStorage.getItem('cart')) || {
        updated_at: new Date(),
        cartTotal: 0,
        goods: {}
    };

    // Функция для обновления корзины в localStorage
    const updateCart = () => {
        cart.updated_at = new Date();
        const cartTotal = Object.values(cart.goods).map(item => item.totalPrice).reduce((a, b) => a + b, 0);
        cart.cartTotal = cartTotal;
        localStorage.setItem('cart', JSON.stringify(cart));
        store.changeCartTotal(cartTotal);
    };

    // Обработчик клика на кнопке "Добавить в корзину"
    const addToCart = (productId) => {
        if (cart.goods[productId]) {
            cart.goods[productId].count++;
            cart.goods[productId].totalPrice += product.price;
        } else {
            cart.goods[productId] = {};
            cart.goods[productId].count = 1;
            cart.goods[productId].totalPrice = product.price;
        }
        cart.goods[productId].price = product.price;
        cart.goods[productId].name = product.name;
        cart.goods[productId].weight = product.weight;
        cart.goods[productId].length = product.length;
        cart.goods[productId].width = product.width;
        cart.goods[productId].height = product.height;
        updateCart();
        setCount(1);
    };

    // Обработчик клика на кнопке "Удалить"
    const removeFromCart = (productId) => {
        delete cart.goods[productId];
        updateCart();
        setCount(0);
    };

    // Обработчик клика на кнопке "Минус"
    const decreaseQuantity = (productId) => {
        if (cart.goods[productId].count >= 2) {
            cart.goods[productId].count--;
            cart.goods[productId].price = product.price;
            cart.goods[productId].name = product.name;
            cart.goods[productId].weight = product.weight;
            cart.goods[productId].length = product.length;
            cart.goods[productId].width = product.width;
            cart.goods[productId].height = product.height;
            cart.goods[productId].totalPrice -= product.price;
            updateCart();
            setCount(count - 1);
        } else {
            removeFromCart(productId);
        }
    };

    // Обработчик клика на кнопке "Плюс"
    const increaseQuantity = (productId) => {
        cart.goods[productId].count++;
        cart.goods[productId].price = product.price;
        cart.goods[productId].name = product.name;
        cart.goods[productId].weight = product.weight;
        cart.goods[productId].length = product.length;
        cart.goods[productId].width = product.width;
        cart.goods[productId].height = product.height;
        cart.goods[productId].totalPrice += product.price;
        updateCart();
        setCount(count + 1);
    };

    return (
        <>
            {progress ? (<LinearProgress color="primary" />) : (
                <Grid container p={2}>
                    <Grid item xs={12}>
                        <Card sx={{ width: '100%', mx: 'auto' }}>
                            <CardContent sx={{ p: { xs: 0, sm: 2 } }}>
                                <Grid container>
                                    <Grid item xs={12} md={6} p={1} textAlign={'center'} sx={{ width: { xs: '100vw', md: '75vw' } }}>
                                        <Carousel items={JSON.parse(product.images).map(item => { return { image: import.meta.env.VITE_APP_BASE_URL + '/' + item, link: '#' } })} dots={true} zoom={true} />
                                    </Grid>
                                    <Grid item xs={12} md={6} p={1}>
                                        <Typography gutterBottom variant="h4" sx={{ typography: { xs: 'h6', md: 'h4' } }} component="h1">
                                            {product.name}
                                        </Typography>
                                        <Box sx={{
                                            width: 'fit-content',
                                            height: 20,
                                            borderRadius: 4,
                                            px: 2,
                                            backgroundColor: product.badge === "new" ? "#1565c0" : product.badge === "top" ? "#c62828" : "#ffc107",
                                            color: 'white',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Typography variant="caption" display="block">
                                                {product.badge === "new" ? "Новинка" : product.badge === "top" ? "Хит" : product.badge}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)' }} variant="caption" display="block" gutterBottom>
                                            Код товара: <span>{product.id}</span>
                                        </Typography>
                                        <p>
                                            {product.published === "true" ? (
                                                <>
                                                    <Typography variant="h5" component="span" gutterBottom sx={{
                                                        color: 'white',
                                                        background: '#60a47c',
                                                        p: 1
                                                    }}>{product.price === 0 ? '' : product.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</Typography>
                                                    <Typography variant="subtitle1" component="span" gutterBottom sx={{
                                                        color: 'rgba(0, 0, 0, 0.5)',
                                                        p: 1,
                                                        my: 1
                                                    }}><del>{product.lastPrice === 0 ? '' : product.lastPrice.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</del></Typography>
                                                </>
                                            ) : (
                                                <Typography variant="h5" component="span" gutterBottom sx={{
                                                    color: 'white',
                                                    background: '#60a47c',
                                                    p: 1
                                                }}>Нет в продаже</Typography>
                                            )}
                                        </p>
                                        {product.published === "true" ? (
                                            <Button sx={{ color: 'white', my: 1, display: count > 0 ? 'none' : 'inline-flex' }} variant="contained" startIcon={<AddShoppingCartIcon />} onClick={() => addToCart(product.id)}>
                                                В корзину
                                            </Button>
                                        ) : (
                                            <></>
                                        )}
                                        <Box display={count > 0 ? 'block' : 'none'}>
                                            <IconButton color="primary" aria-label="Minus button" onClick={() => decreaseQuantity(product.id)}>
                                                <RemoveCircleIcon />
                                            </IconButton>
                                            <Typography variant="h6" component="span" gutterBottom sx={{
                                                border: '1px solid rgba(0,0,0,0.14)',
                                                px: 1.5,
                                                py: 0.1,
                                                verticalAlign: 'middle'
                                            }}>{count}</Typography>
                                            <IconButton color="primary" aria-label="Plus button" onClick={() => increaseQuantity(product.id)}>
                                                <AddCircleIcon />
                                            </IconButton>
                                        </Box>
                                        <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)' }} variant="body2" display="block" gutterBottom>
                                            <LocalShippingOutlinedIcon sx={{ verticalAlign: 'sub' }} fontSize="small" /> Доставка по всей России
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)' }} variant="body2" display="block" gutterBottom>
                                            <PersonOutlinedIcon sx={{ verticalAlign: 'sub' }} fontSize="small" /> Самовывоз из г. Чебоксары
                                        </Typography>
                                        <Rating name="product-rate" value={product.rate} onChange={(evenet, newValue) => changeRate(newValue)} />
                                    </Grid>
                                    <Grid item xs={12} p={1} mt={2}>
                                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{
                                            border: '1px solid rgba(0,0,0,0.14)',
                                            boxShadow: 'none'
                                        }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                                sx={{
                                                    background: '#c4ffdc'
                                                }}
                                            >
                                                <Typography sx={{ color: '#60a47c' }}>
                                                    Описание товара
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography dangerouslySetInnerHTML={{
                                                    __html: product.description
                                                }}></Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <RandomGoods title="Возможно Вам понравится" />
                    </Grid>
                </Grid>
            )}
        </>
    )
});
export default Product;