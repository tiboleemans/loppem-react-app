import React, {useEffect, useState} from "react";
import {classList, debounce} from "../utils";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import {NavLink} from "react-router-dom";
import ScrollTo from "../common/ScrollTo";
import {Button} from "@material-ui/core";

const NavBar = (props) => {
  const [isTop, setIsTop] = useState(true);
  const [isClosed, setIsClosed] = useState(true);

  let scrollableElement = document.querySelector(".scrollable-content");
  if (!scrollableElement) scrollableElement = window;

  let handleScrollRef = null;
  let toggleIcon = isClosed ? "menu" : "close";

  const handleScroll = () => {
    return debounce(({ target: { scrollTop } }) => {
      let isCurrentTop = scrollTop < 100 || scrollableElement.scrollY < 100;
      setIsTop(isCurrentTop);
    }, 20);
  };

  handleScrollRef = handleScroll();

  const close = () => {
    setIsClosed(false);
  };

  useEffect(() => {
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScrollRef);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScrollRef);
      }
    };
  }, [scrollableElement, handleScrollRef]);

  return (
    <section
      className={classList({
        header: true,
        "header-fixed": !isTop,
        closed: isClosed,
      })}
    >
      <div className="container header-container">
        <div className="brand">
          <img src={require('../images/logo.png')} alt=""
               style={{maxWidth: '200px',
                 margin: '-30px 0px'}}
               />
        </div>
        <ul className="navigation">
          {/*<li>*/}
          {/*  <NavLink to="/demos">Demos</NavLink>*/}
          {/*</li>*/}
          <li>
            <ScrollTo to="intro" onScroll={close}>
              Home
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="stages" onScroll={close}>
              Taalvakanties
            </ScrollTo>
          </li>
          {/*<li>*/}
          {/*  <ScrollTo to="inscription" onScroll={close}>*/}
          {/*    Inschrijven*/}
          {/*  </ScrollTo>*/}
          {/*</li>*/}
          <li>
            <ScrollTo to="us" onScroll={close}>
              Over ons
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="media" onScroll={close}>
              Foto's
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="contact" onScroll={close}>
              Contact
            </ScrollTo>
          </li>
          <li>
            <ScrollTo to="faq" onScroll={close}>
              FAQ
            </ScrollTo>
          </li>
        </ul>
        <div className="m-auto" />
        <div className="navigation flex">
          <NavLink to="/login" className="mr-1">
            <Button
              className="box-shadow-none px-8 rounded hover-bg-primary capitalize"
              variant="outlined"
              color="primary"
            >
              INSCHRIJVEN
            </Button>
          </NavLink>
        </div>
        <IconButton
          className="header__toggle"
          onClick={() => {
            setIsClosed(!isClosed);
          }}
        >
          <Icon>{toggleIcon}</Icon>
        </IconButton>
      </div>
    </section>
  );
};

export default NavBar;
