// import axios from "axios";
import * as React from "react";
import { useState } from "react";
// import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = (props) => {

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    cssEase: 'linear',
    variableWidth: true,
    variableHeight: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true
  };

  const [slider, setSlider] = useState(props.items);


  // useEffect(() => {
  //   axios.get(import.meta.env.VITE_APP_BASE_URL + `/api/slider`)
  //     .then(res => {
  //       let json = res.data;
  //       json.sort((a, b) => a.priority - b.priority);
  //       setSlider(json);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //     });
  // }, []);

  return (
    <Slider {...settings}>
      {slider.map((item, i) => (
        <div key={'slider-item' + i}>
          <a href={item.link} target="_self">
            <img
              src={`${item.image}`}
              alt={'Slider item ' + i}
              style={{width: window.innerWidth < 900 ? '100vw' : '75vw'}}
            />
          </a>
        </div>
      ))}
    </Slider>
  )
};

export default Carousel;