import React from "react";

import {Avatar, Card, CardContent} from "@mui/material";

const Testimonial = () => {
    const testimonialList = [{
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
    }, {
        user: {
            imageUrl: require("../../images/testimonial.png"),
            name: "Briek Deblaere",
            designation: "Penningmeester",
        },
    },];

    return (<div className="container" style={{}}>

        <swiper-container slides-per-view="2" space-between="20" style={{width: '100%'}} navigation="true">
            {testimonialList.map((testimonial, index) => (<swiper-slide key={index} style={{width: '50%',}}>
                <div style={{padding: '10px 5px'}}>

                    <Card className="px-6 card-container w-full h-full">
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
                </div>
            </swiper-slide>))}
        </swiper-container>
    </div>);
};

export default Testimonial;
