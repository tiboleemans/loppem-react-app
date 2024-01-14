import React from "react";
import {Button, Grid} from "@mui/material";
import {useTranslation} from "react-i18next";
import QuestionForm from "./QuestionForm";

const QuestionBanner = () => {
  const {t} = useTranslation();
  return (
    <div className="banner" id="rating-banner">
      <div className="container flex-container">
        <h2>{t("banner.question.title")}</h2>
        <div className="banner-button">
          <a className="banner-button-link" href="mailto:info@loppemconversa.be">{t("banner.question.button")}</a>
        </div>
        <QuestionForm />
      </div>
    </div>
  )
};

export default QuestionBanner;
