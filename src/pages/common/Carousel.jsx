import React, {Children, useEffect} from "react";
import PropTypes from "prop-types";
import {Fab} from "@mui/material";
import NavigateNext from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import {theme} from "../../theme";
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

let globalBulletColor = "red";

const Carousel = (props) => {
  const {
    slidesPerView = props.slidesPerView,
    spacing = 100,
    allowSlideNext = true,
    allowSlidePrev = true,
    delay = props.delay,
    navigation = true,
    bulletColor = theme.palette.primary.main,
    carouselId = "swiper-1",
    children,
  } = props;

  globalBulletColor = bulletColor;


  const swiperOptions = {
    direction: "horizontal",
    allowSlideNext,
    allowSlidePrev,
    slidesPerView: 3,
    spaceBetween: spacing,

    autoplay: {
      delay,
      disableOnInteraction: false,
    },

    breakpoints: {
      // when window width is <= 480px
      480: {
        slidesPerView: slidesPerView,
        spaceBetween: 0,
      },
      // when window width is <= 640px
      768: {
        slidesPerView: slidesPerView,
      },
    },

    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      opacity: 1,
      background: globalBulletColor,
      transition: "transform 400ms cubic-bezier(0.17, 0.67, 0.83, 0.67)",
      width: 8,
      height: 8,
      display: "inline-block",
      borderRadius: "100%",
      cursor: "pointer",
      margin: "0 4px",
      transform: "scale(1.8)",
      clickable: true,
    },

    navigation: {
      nextEl: ".carousel__button-next",
      prevEl: ".carousel__button-prev",
    },
  };

  useEffect(() => {
    new Swiper(`#${carouselId}`, swiperOptions);
  }, [swiperOptions]);

  return (
    <div className="relative w-full">
      <div className="swiper-container" id={carouselId}>
        <div className="swiper-wrapper">
          {Children.map(children, (child, index) => (
            <div className="swiper-slide h-auto p-1 pb-6">{child}</div>
          ))}
        </div>

        {/* pagination */}
        <div className={"swiper-pagination relative mt-6 mb-6"}/>
      </div>

      {/* navigation */}
      {navigation && (
        <Fab className="carousel__button-prev bg-white prev-button nav-button">
          <NavigateBefore/>
        </Fab>
      )}
      {navigation && (
        <Fab className="carousel__button-next bg-white next-button nav-button">
          <NavigateNext/>
        </Fab>
      )}
    </div>
  );
};

Carousel.propTypes = {
  carouselId: PropTypes.string.isRequired,
};

export default Carousel;
