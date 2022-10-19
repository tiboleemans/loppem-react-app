import React from "react";
import {classList} from "../utils";
import ScrollTo from "../common/ScrollTo";
import {changeLanguage} from "../i18n/i18nSetup";
import {useTranslation} from "react-i18next";

const NavBar = () => {
    const { t, i18n: { language} } = useTranslation();
    return (
        <section
            className={classList({
                header: true,
                "header-fixed": true
            })}
        >
            <div className="container header-container">
                <div className="brand">
                    <img src={require('../images/logo.png')} alt=""
                         style={{
                             maxWidth: '100px',
                             margin: '-30px 0px'
                         }}
                    />
                </div>
                <ul className="navigation">
                    <li>
                        <ScrollTo to="intro">
                            Home
                        </ScrollTo>
                    </li>
                    <li>
                        <ScrollTo to="taalvakanties">
                            Taalvakanties
                        </ScrollTo>
                    </li>
                    <li>
                        <ScrollTo to="inscription">
                            Inschrijven
                        </ScrollTo>
                    </li>
                    <li>
                        <ScrollTo to="media">
                            Foto's
                        </ScrollTo>
                    </li>
                    <li>
                        <ScrollTo to="contact">
                            Contact
                        </ScrollTo>
                    </li>
                    <li>
                        <ScrollTo to="faq">
                            FAQ
                        </ScrollTo>
                    </li>
                </ul>
                <ul className="navigation"><li>
                    <button type="button" onClick={() => changeLanguage('nl-BE')}>
                        {language === 'nl-BE' ? <b>Nederlands</b> : "Nederlands"}
                    </button>
                    <button type="button" onClick={() => changeLanguage('fr-BE')}>
                        {language === 'fr-BE' ? <b>Français</b> : "Français"}
                    </button>
                </li></ul>
            </div>
        </section>
    );
};

export default NavBar;
