import React from "react";
import {scrollTo} from "./utils";

const ScrollTo = ({to, onScroll, className, children}) => {
  let appContainer = document.querySelector(".scrollable-content");
  if (!appContainer) appContainer = window;

  return (
    <a
      className={`${className}`}
      href={`#${to}`}
      onClick={(e) => {
        scrollTo(appContainer, to);
        if (onScroll) {
          onScroll(e);
        }
      }}
    >
      {children}
    </a>
  );
};

export default ScrollTo;
