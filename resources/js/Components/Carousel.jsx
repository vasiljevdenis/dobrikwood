import * as React from "react";
import { useState } from "react";
import Slider from "react-slick";
import { Link as RouterLink } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Link } from "@mui/material";

const Carousel = (props) => {

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: props.arrows,
    dots: props.dots,
    infinite: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    variableWidth: false,
    variableHeight: true,
    speed: 500,
    autoplay: props.autoplay,
    autoplaySpeed: 5000,
    adaptiveHeight: true
  };

  const [slider, setSlider] = useState(props.items);

  return (
    <Slider {...settings}>
      {slider.map((item, i) => (
        <Box key={'slider-item' + i}>
          {item.link === "#" ? (
            <img
              src={`${item.image}`}
              alt={'Slider item ' + i}
              style={{ width: '100%' }}
              loading={props.loading}
            />
          ) : (
            <Link underline="none" component={RouterLink} to={item.link} target="_self">
              <img
                src={`${item.image}`}
                alt={'Slider item ' + i}
                style={{ width: '100%' }}
                loading={props.loading}
              />
            </Link>
          )}
        </Box>
      ))}
    </Slider>
  )
};

Carousel.defaultProps = {
  arrows: true,
  dots: false,
  autoplay: false,
  loading: 'lazy'
};

export default Carousel;