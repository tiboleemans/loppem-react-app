import React from "react";
import {useTranslation} from "react-i18next";
import './intro.scss'

const Intro = () => {
  const {t} = useTranslation();
  return (
    <div className="intro" id="intro">
      <div className="intro-wrapper">
        <div className="intro-light-background">
          <img src={require('./../../images/intro/logo-baseline.png')} alt="Logo Loppem Conversa" className="intro-logo"/>
        </div>
      </div>
    </div>
  );
};

export default Intro;
