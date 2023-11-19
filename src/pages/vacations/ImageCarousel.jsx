import React, {useEffect, useRef} from "react";
import {Card} from "@mui/material";
import {Navigation, Pagination} from 'swiper/modules';
import CardMedia from "@mui/material/CardMedia";
import "./swiper.scss";

const ImageCarousel = () => {
  const swiperElRef = useRef(null);
  const swiperPaginationRef = useRef(null);

  useEffect(() => {
    // swiper element
    const swiperContainer = document.querySelector('swiper-container');


    // swiper parameters
    const swiperParams = {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      pagination: {
        el: swiperPaginationRef.current,
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      on: {
        init() {
        },
      },
    };

    // now we need to assign all parameters to Swiper element
    Object.assign(swiperContainer, swiperParams);

    // and now initialize it
    swiperContainer.initialize();
  })


  return (
    <>
      <div className="swiper-pagination" ref={swiperPaginationRef}/>
      <swiper-container ref={swiperElRef}>

        <swiper-slide lazy="true">
          <Card className="vacation-swiper-slide-card">
            <img className="vacation-swiper-slide-card-img" src={require("../../images/vacations/1.jpeg")} alt="vacation-picture-1"/>
          </Card>
        </swiper-slide>

        <swiper-slide lazy="true">
          <Card className="vacation-swiper-slide-card">
            <img className="vacation-swiper-slide-card-img" src={require("../../images/vacations/2.jpeg")} alt="vacation-picture-2"/>
          </Card>
        </swiper-slide>
        <swiper-slide lazy="true">
          <Card className="vacation-swiper-slide-card">
            <img className="vacation-swiper-slide-card-img" src={require("../../images/vacations/3.jpeg")} alt="vacation-picture-3"/>
          </Card>
        </swiper-slide>
        <swiper-slide lazy="true">
          <Card className="vacation-swiper-slide-card">
            <img className="vacation-swiper-slide-card-img" src={require("../../images/vacations/4.jpeg")} alt="vacation-picture-4"/>
          </Card>
        </swiper-slide>
        <swiper-slide lazy="true">
          <Card className="vacation-swiper-slide-card">
            <img className="vacation-swiper-slide-card-img" src={require("../../images/vacations/5.jpg")} alt="vacation-picture-5"/>
          </Card>
        </swiper-slide>

        <swiper-slide>
          <CardMedia className="vacation-swiper-slide-card"
                     component="video"
                     image={require("../../images/vacations/promo.mp4")}
                     title='promo-video-loppem-conversa'
                     controls/>
        </swiper-slide>
      </swiper-container>
    </>
  );
};

export default ImageCarousel;
