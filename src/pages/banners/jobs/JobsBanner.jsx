import React from "react";
import {useTranslation} from "react-i18next";
import {getLanguage} from "../../../i18n/i18nSetup";

const JobsBanner = () => {
  const {t} = useTranslation();
  return (
    <div className="banner" id="rating-banner">
      <div className="container flex-container">
        <h2>{t("banner.jobs.title")}</h2>
        <div className="banner-button">
          <a className="banner-button-link" href={`/${getLanguage()}/jobs`}>{t("banner.jobs.button")}</a>
        </div>
      </div>
    </div>
  )
};

export default JobsBanner;
