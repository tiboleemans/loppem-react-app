import React from "react";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";
import './intro.scss'

const Intro = () => {
  const {t} = useTranslation();
  return (
    <div className="intro" id="intro">
      <div className="intro-wrapper">
        <div className="container">
          <div className="intro-banner">
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
          </div>
          <div className="intro-light-background"/>
        </div>
      </div>
    </div>
  );
};

export default Intro;
