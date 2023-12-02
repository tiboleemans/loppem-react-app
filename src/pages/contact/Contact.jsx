import React from "react";
import {Card, Divider, Grid, Link} from "@mui/material";
import {useTranslation} from "react-i18next";
import "./contact.css";
import ContactMap from "./ContactMap";

const Contact = () => {
  const {t} = useTranslation();
  return (
    <div className="contact" id="contact">
      <div className="container">
        <Card className="card-container">
          <h1>{t("contact.title")}</h1>
          <div className="contact-grid">
            <Grid container spacing={6}>
              <Grid item md={6} xs={12}>
                <div className="card card-contact">
                  <div className="card-header-contact">
                    {t("contact.card.1.content.title")}
                  </div>
                  <div className="card-contact-content">
                    <p className="card-contact-content-item">{t("contact.card.1.content.item.1")}</p>
                    <p className="card-contact-content-item">{t("contact.card.1.content.item.2")}</p>
                    <p className="card-contact-content-item">{t("contact.card.1.content.item.3")}</p>
                  </div>
                </div>
                <div className="card card-contact">
                  <div className="card-header-contact">
                    {t("contact.card.2.content.title")}
                  </div>
                  <div className="card-contact-content">
                    <p className="card-contact-content-item">{t("contact.card.2.content.item.1")}</p>
                    <p className="card-contact-content-item">{t("contact.card.2.content.item.2")}</p>
                    <p className="card-contact-content-item">{t("contact.card.2.content.item.3")}</p>
                    <Divider className="mb-2"/>
                    <p className="card-contact-content-item">{t("contact.card.2.content.item.4")}</p>
                    <p className="card-contact-content-item">{t("contact.card.2.content.item.5")}</p>
                  </div>
                </div>
                <div className="card card-contact">
                  <div className="card-header-contact">
                    {t("contact.card.3.content.title")}
                  </div>
                  <div className="card-contact-content">
                    <div className="contact-juvigo card">
                      <Link
                        href="https://www.juvigo.be"
                        target="_blank">
                        <img className="contact-juvigo-img" src={require("../../images/contact/juvigo.png")} alt="juvigo"
                             title={t("contact.card.3.content.item.juvigo")}/>
                      </Link>
                      <p className="contact-juvigo">{t("contact.card.3.content.item.juvigo")}</p>
                    </div>
                    <div className="contact-vgc card">
                      <Link
                        href="https://www.vgc.be/"
                        target="_blank">
                        <img className="contact-vgc-img" src={require("../../images/contact/vgc.png")} alt="vgc"/>
                      </Link>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className="card card-contact">
                  <div className="card-header-contact">
                    {t("contact.card.4.content.title")}
                  </div>
                  <div className="card-contact-content">
                    <p className="card-contact-content-item">{t("contact.card.4.content.item.1")}</p>
                    <p className="card-contact-content-item">{t("contact.card.4.content.item.2")}</p>
                    <p className="card-contact-content-item">{t("contact.card.4.content.item.3")}</p>
                  </div>
                  <div className="contact-map">
                    <ContactMap/>
                  </div>
                </div>
                <div className="card card-contact">
                  <div className="card-header-contact">
                    {t("contact.card.5.content.title")}
                  </div>
                  <div className="card-contact-content">
                    <div className="contact-instagram card">
                      <Link
                        href="https://www.instagram.com/loppemconversa/channel/"
                        target="_blank">
                        <img className="contact-instagram-img" src={require("../../images/contact/instagram_icon.png")} alt="instagram"/>
                      </Link>
                    </div>
                    <div className="contact-facebook card">
                      <Link
                        href="https://www.facebook.com/people/Loppem-Conversa/100064625841426/"
                        target="_blank">
                        <img className="contact-facebook-img" src={require("../../images/contact/facebook.png")} alt="facebook"/>
                      </Link>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
    </div>
  )
    ;
};

export default Contact;
