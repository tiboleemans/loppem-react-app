import React from "react";
import {styled} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";

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
      "url(" + require('../images/intro/intro.jpg') + ") center center/cover no-repeat",
    height: "100%",
    overflow: "hidden"
  },
  [`&.${classes.intro}`]: {
    padding: "3rem 0rem",
    maxWidth: 600,
    [theme.breakpoints.down("sm")]: {
      padding: "2.5rem 0rem",
    },
    zIndex: 5,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative"
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
  const {t} = useTranslation();
  return (
    <section className="intro" id="intro">
      <StyledIntro className={classes.introWrapper}>
        <div className="container">
          <StyledIntro className={classes.intro}>
            <h1 id="intro-title" className="intro-title">
              {t("intro.title")}
            </h1>
            <h4 className="intro-subtitle">
              {t("intro.subtitle")}
            </h4>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <h4 id="intro.info.label.what" className="intro-info-label">{t("intro.info.label.what")}</h4>
              </Grid>
              <Grid item xs={12} sm={9}>
                <h4 className="intro-info-text">{t("intro.info.text.what")}</h4>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <h4 id="intro-info-label" className="intro-info-label">{t("intro.info.label.when")}</h4>
              </Grid>
              <Grid item xs={12} sm={9}>
                <h4 className="intro-info-text">
                  <p>{t("intro.info.text.when.p1")}</p>
                  <p>{t("intro.info.text.when.p2")}</p>
                </h4>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <h4 id="intro-info-label" className="intro-info-label">{t("intro.info.label.who")}</h4>
              </Grid>
              <Grid item xs={12} sm={9}>
                <h4 className="intro-info-text">{t("intro.info.text.who")}</h4>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <h4 id="intro-footer" className="intro-footer">
                  {t("intro.footer")}
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
