import React, {useState} from "react";
import {classList} from "../utils";
import ScrollTo from "../common/ScrollTo";
import {changeLanguage} from "../i18n/i18nSetup";
import {useTranslation} from "react-i18next";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import LanguageSelector from "./controls/LanguageSelector";

const NavBar = () => {
    const { t, i18n: { language} } = useTranslation();
    const [isClosed, setIsClosed] = useState(true);
    return (
        <section
            className={classList({
                header: true,
                "header-fixed": true,
                "closed": "isClosed"
            })}
        >
            <div className="container header-container">
                <div className="brand" >
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
                <div style={{marginLeft: 'auto', order: 2}}>
                    <LanguageSelector />
                </div>
            </div>

        </section>
    );
};

export default NavBar;
