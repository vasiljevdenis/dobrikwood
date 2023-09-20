import * as React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardActionArea, CardContent, Divider, Rating, Typography } from "@mui/material";
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
                setSlider(json);
            })
            .catch(err => {
            })
            .finally(() => {
            });
    }, []);

    return (
        <Box p={0} m={0} sx={{ width: '100%', textAlign: 'center' }}>
            <Typography gutterBottom variant="h4" component="div" sx={{typography: {xs: 'h6', md: 'h5'}, mt: 1}} textAlign={'left'}>
                {props.title}
            </Typography>
            <Slider {...settings}>
                {slider.map((el, i) => (
                    <Card key={'product' + i} sx={{ maxWidth: '18rem', mx: 'auto' }}>
                        <CardActionArea component="div">
                            <Carousel items={ JSON.parse(el.images).map(item => {return {image: import.meta.env.VITE_APP_BASE_URL + '/' + item, link: '#'}}) } dots={true} arrows={false} loading="eager" />
                            <CardContent>
                                <Typography component={RouterLink} to={'/catalog/' + el.category + '/' + el.path} gutterBottom variant="h6" color={'text.primary'}>
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
                ))}
            </Slider>
        </Box>
    )
};

RandomGoods.defaultProps = {
    type: 'random',
    title: ''
  };

export default RandomGoods;