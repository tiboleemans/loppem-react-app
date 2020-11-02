import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import clsx from "clsx";
import Countdown from "react-countdown";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(({palette, ...theme}) => ({
    introWrapper: {
        position: "relative",
        background:
            "url(" + require('../images/intro.jpg') + ") center center/cover no-repeat",
        height: "100%",
        overflow: "hidden",
    },
    intro: {
        padding: "3rem 0rem",
        maxWidth: 600,
        [theme.breakpoints.down("sm")]: {
            padding: "2.5rem 0rem",
        },
        zIndex: 5,
    },
    lightWhiteBG: {
        position: "absolute",
        display: "block",
        top: 0,
        bottom: 0,
        left: "calc(55% - 500px)",
        right: "calc(55% - 500px)",
        background: "rgba(255,255,255,0.75)",
        clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",

        [theme.breakpoints.down("xs")]: {
            right: 0,
            left: 0,
            clipPath: "none",
            background: "rgba(255,255,255,0.7)",
        },
    },
}));

const Intro = () => {
    const classes = useStyles();

    const renderer = ({days, hours, minutes, seconds}) => {
        // Render a countdown
        return (
            <div className="flex max-w-400 flex-wrap mb-2">
                <div className="text-center mr-8">
                    <div className="m-0 text-28">{days}</div>
                    <div className="m-0">dagen</div>
                </div>
                <div className="text-center mr-8">
                    <div className="m-0 text-28">{hours}</div>
                    <div className="m-0">uren</div>
                </div>
                <div className="text-center mr-8">
                    <div className="m-0 text-28">{minutes}</div>
                    <div className="m-0">minuten</div>
                </div>
                <div className="text-center">
                    <div className="m-0 text-28">{seconds}</div>
                    <div className="m-0">seconden</div>
                </div>
            </div>
        );
    };

    return (
        <section className="section bg-light-gray" id="intro">
            <div className={classes.introWrapper}>
                <div className="container">
                    <div
                        className={clsx(
                            "relative mx-auto text-center flex-column justify-center items-center",
                            classes.intro
                        )}
                    >
                        <Countdown date={'2021-07-02T11:00:00'} renderer={renderer}/>,
                        <h1 className="font-medium text-44 text-primary mb-2">
                            Loppem Conversa
                        </h1>
                        <h4 className="font-normal m-0 mb-8 text-black">
                            Een duidelijke voorsprong
                        </h4>
                        {/*<p className="mb-6 max-w-400 mx-auto">*/}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <h4 className="items-end text-right justify-end font-normal m-0 mb-4 text-black">Wat?</h4>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <h5 style={{paddingTop:'4px'}} className="items-start text-left justify-start">Taalvakanties Nederlands / Engels</h5>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <h4 className="items-end text-right justify-end font-normal m-0 mb-4 text-black">Wanneer? </h4>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <h5 style={{paddingTop:'4px'}}  className="items-start text-left justify-start">2 - 12 juli & 2 - 12 augustus</h5>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <h4 className="items-end text-right justify-end font-normal m-0 mb-4 text-black">Wie?</h4>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <h5 style={{paddingTop:'4px'}}  className="items-start text-left justify-start">Voor jongeren van 10 tot 18 jaar</h5>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <h4 className="items-end text-right justify-end font-normal m-0 mb-4 text-black">Waar?</h4>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <h5 style={{paddingTop:'4px'}}  className="items-start text-left justify-start">Abdijschool van Zevenkerken in Loppem (Brugge)</h5>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <h4 className="items-end text-right justify-end font-normal m-0 mb-4 text-black">Hoe?</h4>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <h5 style={{paddingTop:'4px'}} className="items-start text-left justify-start">Immersie met overnachting</h5>
                                </Grid>
                            </Grid>
                        {/*</p>*/}
                        <Button
                            variant="contained"
                            className={"rounded px-6"}
                            color="primary"
                        > Nu inschrijven</Button>
                    </div>
                    <div className={classes.lightWhiteBG}/>
                </div>
            </div>
        </section>
    );
};

export default Intro;
