import React from "react";
import {Button, Grid} from "@mui/material";
import {useTranslation} from "react-i18next";

const QuestionBanner = () => {
  const {t} = useTranslation();
  return (
    <div className="banner" id="rating-banner">
      <div className="container">
        <Grid container>
          <Grid item xs={12} sm={8} className="banner-text">
            <h2>{t("banner.question.title")}</h2>
          </Grid>
          <Grid item xs={3}/>
          <Grid item xs={6} sm={2}>
            <div className="banner-button">
              <a className="banner-button-link" href="mailto:info@loppemconversa.be">{t("banner.question.button")}</a>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
};

export default QuestionBanner;
