import { IconButton } from "@mui/material";
import * as React from "react";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const ToTopBtn = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
    }
    return (
        <IconButton aria-label="top" size="large" color="primary" sx={{
            position: 'fixed',
            bottom: {
                xs: 30,
                md: 60
            },
            right: 5
        }}
        onClick={scrollToTop}>
            <ArrowCircleUpIcon fontSize="inherit" />
        </IconButton>
    )
};

export default ToTopBtn;