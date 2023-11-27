import React, {useState} from "react";
import ScrollTo from "../common/ScrollTo";
import {useTranslation} from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import "./navigation.css"

const Navigation = () => {
  const {t} = useTranslation();
  const [isClosed, setIsClosed] = useState(true);
  return (
    <>
      <button onClick={() => setIsClosed(!isClosed)}>open</button>
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
