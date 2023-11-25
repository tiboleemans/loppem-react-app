import React from "react";
import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";
import BrochurePdf from '../../resources/Brochure Loppem Conversa 2023.pdf';
import DepliantPdf from '../../resources/Dépliant Loppem Conversa 2023.pdf';
import "./banner.css";

const Interest = () => {
  const {t, i18n} = useTranslation();
  return (
    <div className="banner" id="interest-banner">
      <div className="container">
        <Grid container>
          <Grid item sm={12} className="banner-text">
            <h2>{t("banner.interest.text")}</h2>
          </Grid>
          <Grid container className="banner-action">
            <Grid item sm={3}/>
            <Grid item sm={2}>
              <div className="banner-button">
                {t("banner.interest.button.send")}
              </div>
            </Grid>
            <Grid item sm={2}>
            </Grid>
            <Grid item sm={2}>
              <div className="banner-button">
                {i18n.language === "nl-BE" ? <a href={BrochurePdf} target="_blank" rel="noreferrer">{t("banner.interest.button.share")}</a> : null}
                {i18n.language === "fr-BE" ? <a href={DepliantPdf} target="_blank" rel="noreferrer">{t("banner.interest.button.share")}</a> : null}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
};

export default Interest;
