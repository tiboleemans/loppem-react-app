import React, {useEffect} from "react";
import {scrollTo} from "../utils";
import NavBar from "../components/NavBar";
import Intro from "./Intro";
import TaalVakanties from "./TaalVakanties";
import InscriptionForm from "./Inscriptions/InscripionForm";
import Pricing from "./Pricing";
import Gallery from "./Gallery";
import FAQ from "./FAQ";
import Testimonial from "./Testimonial";
import Contact from "./Contact";
import Footer from "./Footer";
import CallToAction from "./CallToAction";
import {useTranslation} from "react-i18next";

const Home = () => {
  const {t, i18n: {language}} = useTranslation();

  useEffect(() => {
    scrollTo("root");
  }, [scrollTo]);

  return (
    <div className="home">
      <NavBar/>
      <Intro/>
      <TaalVakanties/>
      <CallToAction/>
      <InscriptionForm/>
      <CallToAction/>
      <Pricing/>
      <CallToAction/>
      <FAQ/>
      <CallToAction/>
      <Testimonial/>
      <CallToAction/>
      <Gallery/>
      <CallToAction/>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default Home;
