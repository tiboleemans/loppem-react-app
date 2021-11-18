import React from "react";
import {classList} from "../utils";
import ScrollTo from "../common/ScrollTo";

const NavBar = () => {

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
            </div>
        </section>
    );
};

export default NavBar;
