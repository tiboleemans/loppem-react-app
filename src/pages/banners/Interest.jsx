import React from "react";
import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";
import BrochurePdf from '../../resources/Brochure Loppem Conversa 2024.pdf';
import DepliantPdf from '../../resources/Dépliant Loppem Conversa 2024.pdf';
import "./banner.css";
import {getLanguage} from "../../i18n/i18nSetup";

const Interest = () => {
  const {t, i18n} = useTranslation();
  const lang = getLanguage();
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
                {lang.includes("nl") ? <a href={BrochurePdf} target="_blank" rel="noreferrer">{t("banner.interest.button.share")}</a> : null}
                {lang.includes("fr") ? <a href={DepliantPdf} target="_blank" rel="noreferrer">{t("banner.interest.button.share")}</a> : null}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
};

export default Interest;
