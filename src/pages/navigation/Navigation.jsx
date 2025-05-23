import React, {useState} from "react";
import ScrollTo from "../common/ScrollTo";
import {useTranslation} from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import MenuIcon from '@mui/icons-material/Menu';
import "./navigation.css"
import {IconButton} from "@mui/material";
import NavigateTo from "../common/NavigateTo";
import {getLanguage} from "../../i18n/i18nSetup";

const Navigation = () => {
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
              <ScrollTo to="intro">{t("nav.home")}</ScrollTo>
            </li>
            <li>
              <ScrollTo to="vacations">{t("nav.vacations")}</ScrollTo>
            </li>
            <li>
              <ScrollTo to="pricing">{t("nav.pricing")}</ScrollTo>
            </li>
            <li>
              <ScrollTo to="inscription">{t("nav.enroll")}</ScrollTo>
            </li>
            <li>
              <ScrollTo to="info">{t("nav.info")}</ScrollTo>
            </li>
            <li>
              <ScrollTo to="contact">{t("nav.contact")}</ScrollTo>
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

export default Navigation;
