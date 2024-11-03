import React, {useCallback} from "react";

import {Avatar, Card, CardContent} from "@mui/material";
import Grid from "@mui/material/Grid";

const Testimonial = () => {
  const testimonialList = [{
    user: {
      imageUrl: require("../../images/testimonial.png"),
      name: "Thibault",
      designation: "Coördinator - animator",
    },
  }, {
    user: {
      imageUrl: require("../../images/testimonial.png"),
      name: "Briek Deblaere",
      designation: "Penningmeester",
    },
  }, {
    user: {
      imageUrl: require("../../images/testimonial.png"),
      name: "Briek Deblaere",
      designation: "Penningmeester",
    },
  }, {
    user: {
      imageUrl: require("../../images/testimonial.png"),
      name: "Briek Deblaere",
      designation: "Penningmeester",
    },
  },];

  const setSwiperProps = useCallback((el) => {
    if (el !== null) {
      el.slidesPerView = 1;
      el.breakpoints = {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 2,
        },
      };
    }
  });

  return (<div className="container">

    <swiper-container ref={setSwiperProps} space-between="20" style={{width: '100%'}} navigation="true">
      {testimonialList.map((testimonial, index) => (<swiper-slide key={index} style={{width: '50%',}}>
        <div style={{padding: '10px 5px'}}>

          <Card className="px-6 card-container w-full h-full">
            <CardContent className="flex-column justify-between min-h-full">
              <Grid container>
                <Grid item sm={4}>
                  <h1>{testimonial.user.name}</h1>
                  <div className="flex flex-wrap items-center">
                    <Avatar
                      className="w-48 h-48"
                      src={testimonial.user.imageUrl}
                    />
                    <div className="pl-4 m-10">
                      <p className="m-0">
                        <strong></strong>
                      </p>
                      <p className="m-0">{testimonial.user.designation}</p>
                    </div>
                  </div>
                </Grid>
                <Grid item sm={8}>
                  <p className="mt-0 text-16">
                    Thibault is op z’n 18e gestart als animator en zorgt xx jaar later als hoofdcoördinator nog steeds voor het meeste animo op elk
                    kamp, en dat doet steevast met een ongeëvenaarde passie. Thibault is de ruggengraat, de drijvende kracht van Loppem Conversa, voor
                    en achter de schermen én veelvoudig ping-pong kampioen bij de Loppem Conversa kampioenschappen. Wanneer hij niet aan het
                    multitasken is voor Loppem Conversa, is Thibault IT developer bij een xxxbedrijf.
                  </p>
                </Grid>
              </Grid>


            </CardContent>
          </Card>
        </div>
      </swiper-slide>))}
    </swiper-container>
  </div>);
};

export default Testimonial;
