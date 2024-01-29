import React from "react";
import {scrollTo} from "./utils";
import {getLanguage} from "../../i18n/i18nSetup";

const NavigateTo = ({to, onScroll, className, children}) => {
  let appContainer = document.querySelector(".scrollable-content");
  if (!appContainer) appContainer = window;

  return (
    <a
      className={`${className}`}
      href={`/${getLanguage()}/home#${to}`}
    >
      {children}
    </a>
  );
};

export default NavigateTo;
