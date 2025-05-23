import React from "react";
import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";
import BrochurePdf from '../../../resources/Brochure Loppem Conversa.pdf';
import DepliantPdf from '../../../resources/Dépliant Loppem Conversa.pdf';
import FlyerPdf from '../../../resources/Flyer Loppem Conversa.pdf';
import "../banner.css";
import {getLanguage} from "../../../i18n/i18nSetup";
import InterestForm from "./InterestForm";

const Interest = () => {
  const {t} = useTranslation();
  const lang = getLanguage();
  return (
    <div className="banner" id="interest-banner">
      <div className="container">
        <Grid container>
          <Grid item sm={12} className="banner-text">
            <h2>{t("banner.interest.text")}</h2>
          </Grid>
          <Grid container spacing={2} className="banner-action">
            <Grid item xs={1} sm={2}/>
            <Grid item xs={5} sm={3}>
              <InterestForm />
            </Grid>
            <Grid item xs={0} sm={2}>
            </Grid>
            <Grid item xs={5} sm={3}>
              <div className="banner-button">
                {lang.includes("nl") ? <a href={BrochurePdf} target="_blank" rel="noreferrer">{t("banner.interest.button.share")}</a> : null}
                {lang.includes("fr") ? <a href={DepliantPdf} target="_blank" rel="noreferrer">{t("banner.interest.button.share")}</a> : null}
                {lang.includes("en") ? <a href={FlyerPdf} target="_blank" rel="noreferrer">{t("banner.interest.button.share")}</a> : null}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
};

export default Interest;
