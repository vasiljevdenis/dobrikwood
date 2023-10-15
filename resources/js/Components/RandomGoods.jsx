import * as React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardActionArea, CardContent, Divider, Grid, Rating, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "./Carousel";
import axios from "axios";

const RandomGoods = (props) => {

    const [slider, setSlider] = React.useState([]);

    const settings = {
        arrows: true,
        dots: false,
        infinite: true,
        cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
        variableWidth: false,
        variableHeight: true,
        speed: 500,
        autoplay: false,
        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: slider.length >= 3 ? 3 : 2,
                    slidesToScroll: slider.length >= 3 ? 3 : 2
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    React.useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + '/api/catalog-' + props.type)
            .then(res => {
                let json = res.data;
                if (window.innerWidth <= 600) {
                    json = json.slice(0, 4);
                    console.log(json);
                }
                setSlider(json);
            })
            .catch(err => {
            })
            .finally(() => {
            });
    }, []);

    return (
        <Box p={0} m={0} sx={{ width: '100%', textAlign: 'center' }}>
            <Typography gutterBottom variant="h4" component="div" sx={{ typography: { xs: 'h6', md: 'h5' }, mt: 1, textAlign: { xs: 'center', md: 'left' } }}>
                {props.title}
            </Typography>
            {window.innerWidth > 600 ? (
                <Slider {...settings}>
                    {slider.map((el, i) => (
                        <RouterLink key={'product' + i} style={{ textDecoration: 'none' }} to={'/catalog/' + el.category + '/' + el.path}>
                            <Card sx={{ maxWidth: '18rem', mx: 'auto', position: 'relative' }}>
                                <CardActionArea component="div">
                                    <Carousel items={JSON.parse(el.images).map(item => { return { image: import.meta.env.VITE_APP_BASE_URL + '/' + item, link: '#' } })} dots={true} arrows={false} loading="eager" />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" color={'text.primary'}>
                                            {el.name}
                                        </Typography>
                                        <Divider />
                                        <Rating name="read-only" value={el.rate} readOnly />
                                        <p style={{ textAlign: 'right' }}>
                                            {el.published === "true" ? (
                                                <>
                                                    <Typography variant="subtitle2" component="span" gutterBottom sx={{
                                                        color: 'rgba(0, 0, 0, 0.5)',
                                                        p: 1
                                                    }}><del>{el.lastPrice === 0 ? '' : el.lastPrice.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</del></Typography>
                                                    <Typography variant="h6" component="span" gutterBottom sx={{
                                                        color: 'white',
                                                        background: '#60a47c',
                                                        p: 1
                                                    }}>{el.price === 0 ? '' : el.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</Typography>
                                                </>
                                            ) : (
                                                <Typography variant="h6" component="span" gutterBottom sx={{
                                                    color: 'white',
                                                    background: '#60a47c',
                                                    p: 1
                                                }}>Нет в продаже</Typography>
                                            )}
                                        </p>
                                    </CardContent>
                                </CardActionArea>
                                <Box sx={{
                                    width: 'fit-content',
                                    height: 20,
                                    borderRadius: 4,
                                    px: 2,
                                    backgroundColor: el.badge === "new" ? "#1565c0" : el.badge === "top" ? "#c62828" : "#ffc107",
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    top: 2,
                                    right: 2
                                }}>
                                    <Typography variant="caption" display="block">
                                        {el.badge === "new" ? "Новинка" : el.badge === "top" ? "Хит" : el.badge}
                                    </Typography>
                                </Box>
                            </Card>
                        </RouterLink>
                    ))}
                </Slider>
            ) : (
                <Grid container p={1}>
                    {slider.map((el, i) => {
                        return (
                            <Grid key={'product' + i} item xs={12} m={1}>
                                <RouterLink style={{ textDecoration: 'none' }} to={'/catalog/' + el.category + '/' + el.path}>
                                    <Card sx={{ maxWidth: '18rem', mx: 'auto', position: 'relative' }}>
                                        <CardActionArea component="div">
                                            <Carousel items={JSON.parse(el.images).map(item => { return { image: import.meta.env.VITE_APP_BASE_URL + '/' + item, link: '#' } })} dots={true} arrows={false} loading="eager" />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" color={'text.primary'}>
                                                    {el.name}
                                                </Typography>
                                                <Divider />
                                                <Rating name="read-only" value={el.rate} readOnly />
                                                <p style={{ textAlign: 'right' }}>
                                                    {el.published === "true" ? (
                                                        <>
                                                            <Typography variant="subtitle2" component="span" gutterBottom sx={{
                                                                color: 'rgba(0, 0, 0, 0.5)',
                                                                p: 1
                                                            }}><del>{el.lastPrice === 0 ? '' : el.lastPrice.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</del></Typography>
                                                            <Typography variant="h6" component="span" gutterBottom sx={{
                                                                color: 'white',
                                                                background: '#60a47c',
                                                                p: 1
                                                            }}>{el.price === 0 ? '' : el.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</Typography>
                                                        </>
                                                    ) : (
                                                        <Typography variant="h6" component="span" gutterBottom sx={{
                                                            color: 'white',
                                                            background: '#60a47c',
                                                            p: 1
                                                        }}>Нет в продаже</Typography>
                                                    )}
                                                </p>
                                            </CardContent>
                                        </CardActionArea>
                                        <Box sx={{
                                            width: 'fit-content',
                                            height: 20,
                                            borderRadius: 4,
                                            px: 2,
                                            backgroundColor: el.badge === "new" ? "#1565c0" : el.badge === "top" ? "#c62828" : "#ffc107",
                                            color: 'white',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'absolute',
                                            top: 2,
                                            right: 2
                                        }}>
                                            <Typography variant="caption" display="block">
                                                {el.badge === "new" ? "Новинка" : el.badge === "top" ? "Хит" : el.badge}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </RouterLink>
                            </Grid>
                        )
                    })}
                </Grid>
            )}
        </Box>
    )
};

RandomGoods.defaultProps = {
    type: 'random',
    title: ''
};

export default RandomGoods;