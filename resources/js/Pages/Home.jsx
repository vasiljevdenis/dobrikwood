import { Box } from "@mui/material";
import * as React from "react";
import Carousel from "../Components/Carousel";
import slide1 from '../../images/001.png';
import slide2 from '../../images/002.png';
import slide3 from '../../images/003.png';
import slide4 from '../../images/004.png';
import slide5 from '../../images/005.png';

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
            <Box p={0} m={0} sx={{ width: '100%', textAlign: 'center' }}>
                <Carousel items={items} arrows={false} autoplay={true} />
            </Box>
        </>
    )
};

export default Home;