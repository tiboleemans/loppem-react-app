import React, {Children, useEffect} from "react";
import PropTypes from "prop-types";
import {Fab} from "@mui/material";
import NavigateNext from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import clsx from "clsx";
import {styled} from "@mui/system";
import {theme} from "../theme";
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'


let globalBulletColor = "red";

const PREFIX = 'MyCarousel';

const classes = {
  bulletClass: `${PREFIX}-bulletClass`,
  bulletActiveClass: `${PREFIX}-bulletActiveClass`,
  nextButton: `${PREFIX}-nextButton`,
  prevButton: `${PREFIX}-prevButton`,
  navButton: `${PREFIX}-navButton`,
}
const StyledCarousel = styled(Fab)(({theme}) => ({
  [`&.${classes.bulletClass}`]: {
    opacity: 1,
    background: globalBulletColor,
    transition: "transform 400ms cubic-bezier(0.17, 0.67, 0.83, 0.67)",
    width: 8,
    height: 8,
    display: "inline-block",
    borderRadius: "100%",
    cursor: "pointer",
    margin: "0 4px",
  },
  [`&.${classes.bulletActiveClass}`]: {
    transform: "scale(1.8)",
  },
  [`&.${classes.prevButton}`]: {
    left: 0,
    marginLeft: "-24px !important",
  },
  [`&.${classes.nextButton}`]: {
    right: 0,
    marginRight: "-24px !important",
  },
  [`&.${classes.navButton}`]: {
    position: "absolute !important",
    top: "50%",
    transform: "translateY(calc(-50% - 50px))",
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Carousel = (props) => {
  const {
    slidesPerView = props.slidesPerView,
    spacing = 100,
    allowSlideNext = true,
    allowSlidePrev = true,
    delay = props.delay,
    navigation = true,
    bulletColor = theme.palette.primary.main,
    paginationClass = "mt-6 mb-6",
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
        <div className={clsx("swiper-pagination relative", paginationClass)}/>
      </div>

      {/* navigation */}
      {navigation && (
        <StyledCarousel
          className={clsx(
            "carousel__button-prev bg-white",
            classes.prevButton,
            classes.navButton
          )}
        >
          <NavigateBefore/>
        </StyledCarousel>
      )}
      {navigation && (
        <StyledCarousel
          className={clsx(
            "carousel__button-next bg-white",
            classes.nextButton,
            classes.navButton
          )}
        >
          <NavigateNext/>
        </StyledCarousel>
      )}
    </div>
  );
};

Carousel.propTypes = {
  carouselId: PropTypes.string.isRequired,
};

export default Carousel;
