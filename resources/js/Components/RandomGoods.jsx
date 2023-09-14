import * as React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardActionArea, CardContent, Divider, Rating, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "./Carousel";
import axios from "axios";

const RandomGoods = () => {

    const [slider, setSlider] = React.useState([]);

    const settings = {
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        dots: false,
        infinite: true,
        cssEase: 'linear',
        variableWidth: false,
        variableHeight: true,
        speed: 500,
        autoplay: false,
        adaptiveHeight: true
    };

    React.useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + '/api/catalog-random')
            .then(res => {
                let json = res.data;
                setSlider(json);
            })
            .catch(err => {
            })
            .finally(() => {
            });
    }, []);

    return (
        <Box p={0} m={0} sx={{ width: '100%', height: '100%', textAlign: 'center' }}>
            <Slider {...settings}>
                {slider.map((el, i) => (
                    <RouterLink key={'product' + i} style={{ textDecoration: 'none' }} to={'/catalog/' + el.category + '/' + el.path}>
                        <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                            <CardActionArea>
                                <Carousel items={[
                                    {
                                        image: import.meta.env.VITE_APP_BASE_URL + '/storage/images/' + el.category + '/' + el.path + '1.jpg',
                                        link: '#'
                                    },
                                    {
                                        image: import.meta.env.VITE_APP_BASE_URL + '/storage/images/' + el.category + '/' + el.path + '2.jpg',
                                        link: '#'
                                    },
                                    {
                                        image: import.meta.env.VITE_APP_BASE_URL + '/storage/images/' + el.category + '/' + el.path + '3.jpg',
                                        link: '#'
                                    }
                                ]} dots={true} arrows={false} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {el.name}
                                    </Typography>
                                    <Divider />
                                    <Rating name="read-only" value={el.rate} readOnly />
                                    <p style={{ textAlign: 'right' }}>
                                        <Typography variant="subtitle2" component="span" gutterBottom sx={{
                                            color: 'rgba(0, 0, 0, 0.5)',
                                            p: 1
                                        }}><del>{el.lastPrice === 0 ? '' : el.lastPrice.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</del></Typography>
                                        <Typography variant="h6" component="span" gutterBottom sx={{
                                            color: 'white',
                                            background: '#60a47c',
                                            p: 1
                                        }}>{el.price === 0 ? '' : el.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' ₽'}</Typography>
                                    </p>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </RouterLink>
                ))}
            </Slider>
        </Box>
    )
};

export default RandomGoods;