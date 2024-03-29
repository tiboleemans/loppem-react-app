import React, {useCallback, useEffect, useRef} from "react";
import {Modal} from "@mui/material";

import './full-screen-carousel.scss';

const FullScreenCarousel = ({onClose}) => {
    const swiperElRef = useRef(null);

    useEffect(() => {
        const eventListener = (ev) => {
            if (ev.key === 'Escape' && onClose !== undefined) {
                onClose();
            }
            if (ev.key === 'ArrowLeft' && swiperElRef.current !== null) {
                swiperElRef.current.swiper?.slidePrev();
            }
            if (ev.key === 'ArrowRight' && swiperElRef.current !== null) {
                swiperElRef.current.swiper?.slideNext();
            }
        };
        document.addEventListener('keyup', eventListener);
        return () => document.removeEventListener('keyup', eventListener);
    }, [swiperElRef.current]);


    const setSwiperProps = useCallback((el) => {
        if (el !== null) {
            el.breakpoints= {
                640: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 5,
                },
            };
            el.slidesPerView = 3;
        }
    });

    return (<Modal
        sx={{
            color: '#ffffff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            height: '100vh'
        }}
        open={true}
        onClose={onClose}
    >
        <>
            <swiper-container class="full-screen-carousel" thumbs-swiper=".thumbs-swiper" navigation="true">

                {[1, 2, 3, 4, 5].map((i) => (<swiper-slide key={i}>
                    <div style={{padding: '30px', display: 'flex', height: '100%'}}>
                        <img className="vacation-swiper-slide-card-img"
                             src={require("../../../images/vacations/" + i + ".jpeg")}
                             alt={"vacation-picture-" + i} style={{
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }}/>
                    </div>
                </swiper-slide>))}

                <swiper-slide>
                    <iframe src="https://www.youtube.com/embed/d7H1GaxaQ9w?si=HiPDdZ_XKaj2r5S4"
                            title="Loppem Conversa promo"
                            frameBorder="0"
                            style={{width: '100%', height: '100%', margin: '0px 50px'}}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen/>
                </swiper-slide>
            </swiper-container>
            <swiper-container class="thumbs-swiper" space-between="10" free-mode="true"
                              watch-slides-progress="true" style={{
                height: '20%',
                padding: '10px',
                boxSizing: 'border-box'
            }} ref={setSwiperProps}>
                {[1, 2, 3, 4, 5].map((i) => (<swiper-slide lazy="true" key={i}>
                    <img className="vacation-swiper-slide-card-img"
                         src={require("../../../images/vacations/" + i + ".jpeg")}
                         alt={"vacation-picture-" + i} style={{
                        maxHeight: '100%',
                        objectFit: 'cover'
                    }}/>
                </swiper-slide>))}

                <swiper-slide>
                    <iframe src="https://www.youtube.com/embed/d7H1GaxaQ9w?si=HiPDdZ_XKaj2r5S4"
                            title="Loppem Conversa promo"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen/>
                </swiper-slide>
            </swiper-container>
        </>
    </Modal>);
};

export default FullScreenCarousel;
