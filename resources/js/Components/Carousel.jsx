import * as React from "react";
import { useState } from "react";
import Slider from "react-slick";
import { Link as RouterLink } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Backdrop, Box, Fade, Link, Modal } from "@mui/material";

const Carousel = (props) => {

  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState('');

  const openImage = (i) => {
    setSlide(i);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

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
    <>
    <Slider {...settings}>
      {slider.map((item, i) => (
        <Box key={'slider-item' + i}>
          {item.link === "#" ? (
            <img
              src={`${item.image}`}
              alt={'Slider item ' + i}
              style={{ width: '100%' }}
              loading={props.loading}
              onClick={() => openImage(item.image)}
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
    <Modal
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
        slots={{
          backdrop: Backdrop
        }}
      >
        <Fade in={open} timeout={500} className="img">
          <img
            src={slide}
            alt="FullScreen"
            style={{ maxHeight: "95%", maxWidth: "95%" }}
          />
        </Fade>
      </Modal>
    </>
  )
};

Carousel.defaultProps = {
  arrows: true,
  dots: false,
  autoplay: false,
  loading: 'lazy',
  zoom: false
};

export default Carousel;