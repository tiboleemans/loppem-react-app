import React from "react";
import {styled} from "@mui/material/styles";
import clsx from "clsx";
import Grid from "@mui/material/Grid";

const PREFIX = 'MyIntro';

const classes = {
  introWrapper: `${PREFIX}-introWrapper`,
  intro: `${PREFIX}-intro`,
  lightWhiteBG: `${PREFIX}-lightWhiteBG`,
}

const StyledIntro = styled('div')(({theme}) => ({
  [`&.${classes.introWrapper}`]: {
    position: "relative",
    background:
      "url(" + require('../images/intro.jpg') + ") center center/cover no-repeat",
    height: "100%",
    overflow: "hidden"
  },
  [`&.${classes.intro}`]: {
    padding: "3rem 0rem",
    maxWidth: 600,
    [theme.breakpoints.down("sm")]: {
      padding: "2.5rem 0rem",
    },
    zIndex: 5
  },
  [`&.${classes.lightWhiteBG}`]: {
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
  }
}))

const Intro = () => {
  return (
    <section className="pt-12 bg-light-gray" id="intro">
      <StyledIntro className={classes.introWrapper}>
        <div className="container">
          <StyledIntro
            className={clsx(
              "relative mx-auto text-center flex-column justify-center items-center",
              classes.intro
            )}
          >
            <h1 className="font-medium text-44 text-black mb-2">
              Loppem Conversa
            </h1>
            <h4 className="font-italic font-normal m-0 mb-8 text-black">
              Een duidelijke voorsprong
            </h4>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <h4 className="items-end text-right justify-end font-normal m-0 mb-4 text-black">Wat?</h4>
              </Grid>
              <Grid item xs={12} sm={9}>
                <h5 style={{paddingTop: '4px'}} className="items-start text-left justify-start">Taalvakanties Nederlands / Engels</h5>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <h4 className="items-end text-right justify-end font-normal m-0 mb-4 text-black">Wanneer? </h4>
              </Grid>
              <Grid item xs={12} sm={9}>
                <h5 style={{paddingTop: '4px'}} className="items-start text-left justify-start">9 - 19 juli 2023 & 2 - 12 augustus
                  2023</h5>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <h4 className="items-end text-right justify-end font-normal m-0 mb-4 text-black">Wie?</h4>
              </Grid>
              <Grid item xs={12} sm={9}>
                <h5 style={{paddingTop: '4px'}} className="items-start text-left justify-start">Voor jongeren van 10 tot 18 jaar</h5>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <h4 className="font-normal font-italic mt-8 text-black text-18 text-left">
                  Wij zijn pas tevreden wanneer de jongeren in de doeltaal dromen!
                </h4>
              </Grid>
            </Grid>
          </StyledIntro>
          <StyledIntro className={classes.lightWhiteBG}/>
        </div>
      </StyledIntro>
    </section>
  );
};

export default Intro;
