import React, {useEffect} from "react";
import {scrollTo} from "../utils";
import NavBar from "../components/NavBar";
import Intro from "./Intro";
import TaalVakanties from "./TaalVakanties";
import OverOns from "./OverOns";
import InscriptionForm from "./Inscriptions/InscripionForm";
import ContactForm from "../contact";
import Pricing from "./Pricing";
import Gallery from "./Gallery";
import FAQ from "./FAQ";
import Testimonial1 from "./Testimonial1";
import Contact2 from "./Contact2";

const Home = () => {
  useEffect(() => {
    scrollTo("root");
  }, [scrollTo]);

  return (
    <div className="home">
      <NavBar/>
      <Intro/>
      <TaalVakanties/>
      <OverOns/>
      <InscriptionForm/>
      <Pricing/>
      <Gallery/>
      <FAQ/>
      <Testimonial1/>
      <Contact2/>
    </div>
  );
};

export default Home;
