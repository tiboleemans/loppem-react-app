import React, {useState} from "react";
import ScrollTo from "../common/ScrollTo";
import {useTranslation} from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import MenuIcon from '@mui/icons-material/Menu';
import "./navigation.css"
import {IconButton} from "@mui/material";
import {Redirect, Route} from "react-router-dom";
import {getLanguage} from "../../i18n/i18nSetup";
import NavigateTo from "../common/NavigateTo";

const NavigationExternal = () => {
  const {t} = useTranslation();
  const [isClosed, setIsClosed] = useState(true);
  return (
    <>
      <div className="header-menu-button" onClick={() => setIsClosed(!isClosed)}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </div>
      <div className={`header header-fixed ${isClosed ? 'closed' : ''}`}>
        <div className="container header-container">
          <ScrollTo to="intro">
            <div className="brand">
              <img src={require('../../images/navigation/logo.png')} className="nav-logo" alt="nav-logo"/>
            </div>
          </ScrollTo>
          <ul className="navigation">
            <li>
              <NavigateTo to="intro">{t("nav.home")}</NavigateTo>
            </li>
            <li>
              <NavigateTo to="vacations">{t("nav.vacations")}</NavigateTo>
            </li>
            <li>
              <NavigateTo to="pricing">{t("nav.pricing")}</NavigateTo>
            </li>
            <li>
              <NavigateTo to="inscription">{t("nav.enroll")}</NavigateTo>
            </li>
            <li>
              <NavigateTo to="info">{t("nav.info")}</NavigateTo>
            </li>
            <li>
              <NavigateTo to="contact">{t("nav.contact")}</NavigateTo>
            </li>
            <li>
              <a
                href={`/${getLanguage()}/jobs`}
              >
                {t("nav.jobs")}
              </a>
            </li>
          </ul>
          <div className="nav-language-selector">
            <LanguageSelector/>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationExternal;
