import React from "react";
import './intro.scss'
import {getLanguage} from "../../i18n/i18nSetup";

const Intro = () => {
  const lang = getLanguage();
  return (
    <div className="intro" id="intro">
      <div className="intro-wrapper" id="intro">
        <div className="intro-light-background">
          {lang.includes('nl') ?
            <img src={require('./../../images/intro/logo-baseline-nl.png')} alt="Logo Loppem Conversa" className="intro-logo"/> : null}
          {lang.includes('fr') ?
            <img src={require('./../../images/intro/logo-baseline-fr.png')} alt="Logo Loppem Conversa" className="intro-logo"/> : null}
        </div>
      </div>
    </div>
  );
};

export default Intro;
