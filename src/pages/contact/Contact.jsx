import React from "react";
import {Card, Divider, Grid, Link} from "@mui/material";
import {useTranslation} from "react-i18next";
import "./contact.css";
import ContactMap from "./ContactMap";

const Contact = () => {
  const {t} = useTranslation();

  const contactCards = [
    {
      "title": "Contactpersoon",
      "details": [
        "Thibault Leemans",
        "info@loppemconversa.be",
        "0478 51 93 44 (bij voorkeur buiten de kantooruren)"
      ]
    },
    {
      "title": "Organisatie",
      "details": [
        "VZW Taalvakanties Conversa",
        "0714.900.490",
        "Tortelduifstraat 63, 9000 Gent",
        "BE16 0018 5319 2474",
        "GEBABEBB"
      ]
    }
  ]

  return (
    <div className="contact" id="contact">
      <div className="container">
        <Card className="card-container">
          <h1>Contactinformatie</h1>
          <Grid container spacing={6}>
            <Grid item md={6} xs={12}>
              <div className="card card-contact">
                <div className="card-header-contact">
                  Contactpersoon
                </div>
                <div className="card-contact-content">
                  <p className="card-contact-content-item">Thibault Leemans</p>
                  <p className="card-contact-content-item">info@loppemconversa.be</p>
                  <p className="card-contact-content-item">0478 51 93 44 (bij voorkeur buiten de kantooruren)</p>
                </div>
              </div>
              <div className="card card-contact">
                <div className="card-header-contact">
                  Organisatie
                </div>
                <div className="card-contact-content">
                  <p className="card-contact-content-item">VZW Taalvakanties Conversa</p>
                  <p className="card-contact-content-item">0714.900.490</p>
                  <p className="card-contact-content-item">Tortelduifstraat 63, 9000 Gent</p>
                  <Divider className="mb-2"/>
                  <p className="card-contact-content-item">BE16 0018 5319 2474</p>
                  <p className="card-contact-content-item">GEBABEBB</p>
                </div>
              </div>
              <div className="card card-contact">
                <div className="card-header-contact">
                  Partners
                </div>
                <div className="card-contact-content">
                  <div className="contact-juvigo card">
                    <Link
                      href="https://www.juvigo.be"
                      target="_blank">
                      <img className="contact-instagram-img" src={require("../../images/contact/juvigo.png")} alt="juvigo"
                           title="De taalkampen van Loppem Conversa vind je ook bij Juvigo!"/>
                    </Link>
                    <p className="contact-juvigo-img">De taalkampen van Loppem Conversa vind je ook bij Juvigo!</p>
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
                  Kamp adres
                </div>
                <div className="card-contact-content">
                  <p className="card-contact-content-item">Loppem Conversa</p>
                  <p className="card-contact-content-item">Abdijschool van Zevenkerken</p>
                  <p className="card-contact-content-item">Zevenkerken 4, 8200 Brugge</p>
                </div>
                <div className="contact-map">
                  <ContactMap/>
                </div>
              </div>
              <div className="card card-contact">
                <div className="card-header-contact">
                  Social media
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
        </Card>
      </div>
    </div>
  )
    ;
};

export default Contact;
