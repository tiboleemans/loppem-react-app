import React from "react";

import {Avatar, Card, CardContent} from "@mui/material";
import Carousel from "../common/Carousel";

const Testimonial = () => {
  const testimonialList = [
    {
      user: {
        imageUrl: require("../../images/briek.jpg"),
        name: "Briek Deblaere",
        designation: "Penningmeester",
      },
    },
    {
      user: {
        imageUrl: require("../../images/briek.jpg"),
        name: "Briek Deblaere",
        designation: "Penningmeester",
      },
    },
    {
      user: {
        imageUrl: require("../../images/briek.jpg"),
        name: "Briek Deblaere",
        designation: "Penningmeester",
      },
    },
    {
      user: {
        imageUrl: require("../../images/briek.jpg"),
        name: "Briek Deblaere",
        designation: "Penningmeester",
      },
    },
  ];

  return (
    <div className="section" id="getuigenis">
      <div className="container">
        <div className="section__header">
          <h2>Enkele getuigenissen</h2>
        </div>

        <Carousel carouselId="getuigenis-1" slidesPerView="3" delay="5000">
          {testimonialList.map((testimonial, index) => (
            <Card className="px-6 card-container w-full h-full" key={index}>
              <CardContent className="flex-column justify-between min-h-full">
                <h1>Un stage incroyable</h1>
                <p className="mt-0 text-16">
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugit modi voluptas vero iusto fuga quos totam eius, atis
                  magnam tempora doloribus ducimus dolorem elit. Fugit modi
                  voluptas vero iusto fuga quos totam eius Sapiente, quia
                  tempora."
                </p>

                <div className="flex flex-wrap items-center">
                  <Avatar
                    className="w-48 h-48"
                    src={testimonial.user.imageUrl}
                  />
                  <div className="pl-4 m-10">
                    <p className="m-0">
                      <strong>{testimonial.user.name}</strong>
                    </p>
                    <p className="m-0">{testimonial.user.designation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonial;
