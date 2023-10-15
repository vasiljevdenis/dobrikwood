import { Box, Divider, Grid, Typography } from "@mui/material";
import * as React from "react";
import Carousel from "../Components/Carousel";
import slide1 from '../../images/001.png';
import slide2 from '../../images/002.png';
import slide3 from '../../images/003.png';
import slide4 from '../../images/004.png';
import slide5 from '../../images/005.png';
import RandomGoods from "../Components/RandomGoods";

const Home = () => {

    const items = [
        {
            image: slide1,
            link: '/catalog/loshadki-kachalki'
        },
        {
            image: slide2,
            link: '/catalog/comody-stellazhi'
        },
        {
            image: slide3,
            link: '/catalog/stoly-stulya'
        },
        {
            image: slide4,
            link: '/catalog/igrushki'
        },
        {
            image: slide5,
            link: '/catalog/tumbochki'
        }
    ];

    return (
        <>
            <Box p={0} m={0} sx={{ width: '100%', textAlign: 'center', background: '#b49c83' }}>
                <Carousel items={items} arrows={false} autoplay={true} loading="eager" />
            </Box>
            <Box p={0} m={0} sx={{ width: '100%', textAlign: 'center', background: '#b49c83' }}>
                <Typography variant="h3" component="p" sx={{
                    typography: {
                        xs: 'h6',
                        md: 'h5'
                    },
                    fontFamily: 'Evolventa !important',
                    pt: 1,
                    pb: 1.5
                }} color="white" gutterBottom>
                    Добро пожаловать на сайт мастерской "Добрик-Wood!"
                </Typography>
            </Box>
            <Box p={0} m={0} sx={{ width: '100%', textAlign: 'center' }}>
                <Typography variant="h3" component="p" sx={{
                    typography: {
                        xs: 'body1',
                        md: 'h6'
                    },
                    fontFamily: 'Evolventa !important',
                    py: 1.5
                }} gutterBottom>
                    Стильные и качественные решения для детской и не только...
                </Typography>
            </Box>
            <Divider variant="middle" light={false} sx={{
                width: '36%',
                mx: '32%'
            }} />
            <Grid container p={2}>
                <Grid item xs={12}>
                    <RandomGoods title="Новинки" type="new" />
                </Grid>
                <Grid item xs={12}>
                    <RandomGoods title="Хиты продаж" type="top" />
                </Grid>
                <Grid item xs={12}>
                    <RandomGoods title="Акции" type="sale" />
                </Grid>
            </Grid>
        </>
    )
};

export default Home;