import React, {useEffect, useRef, useState} from "react";
import {Card} from "@mui/material";
import {Navigation, Pagination} from 'swiper/modules';
import FullScreenCarousel from "../common/full-screen-carousel/FullScreenCarousel";

const ImageCarousel = () => {
    const swiperElRef = useRef(null);
    const swiperPaginationRef = useRef(null);
    const [showFullScreen, setShowFullScreen] = useState(false);

    useEffect(() => {
        // swiper element
        const swiperContainer = document.querySelector('swiper-container');

        // swiper parameters
        const swiperParams = {
            modules: [Navigation, Pagination],
            slidesPerView: 1, // loop: true,
            // pagination: {
            //   el: swiperPaginationRef.current,
            //   type: 'fraction',
            // },
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
        };

        // now we need to assign all parameters to Swiper element
        Object.assign(swiperContainer, swiperParams);

        // and now initialize it
        swiperContainer.initialize();

    });

    // TODO: move inline styles to (s)css file
    return (<>
        <swiper-container ref={swiperElRef}>
            {[1, 2, 3, 4, 5].map((i) => (<swiper-slide lazy="true" key={i} style={{
                height: '500px',
                display: 'flex',
                alignItems: 'center'
            }}>
                <div style={{padding: '20px'}}>
                    <Card className="vacation-swiper-slide-card" onClick={() => setShowFullScreen(true)}>
                        <div>
                            <img className="vacation-swiper-slide-card-img" src={require("../../images/vacations/" + i + ".jpeg")}
                                 alt={"vacation-picture-" + i}/>

                        </div>
                    </Card>
                </div>
            </swiper-slide>))}

            <swiper-slide style={{
                height: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Card className="vacation-swiper-slide-card">
                    <iframe src="https://www.youtube.com/embed/d7H1GaxaQ9w?si=HiPDdZ_XKaj2r5S4" title="Loppem Conversa promo"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen/>
                </Card>
            </swiper-slide>
        </swiper-container>
        {showFullScreen && <FullScreenCarousel onClose={() => setShowFullScreen(false)}/>}
    </>);
};

export default ImageCarousel;
