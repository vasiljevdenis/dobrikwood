import { Box } from "@mui/material";
import * as React from "react";
import Carousel from "../Components/Carousel";
import slide1 from '../../images/001.png';
import slide2 from '../../images/002.png';
import slide3 from '../../images/003.png';

const Home = () => {

    const items = [
        {
            image: slide1,
            link: '/'
        },
        {
            image: slide2,
            link: '/'
        },
        {
            image: slide3,
            link: '/'
        }
    ];

    return (
        <>
            <Box p={0} m={0} sx={{ width: '100%', textAlign: 'center' }}>
                <Carousel items={items} />
            </Box>
        </>
    )
};

export default Home;