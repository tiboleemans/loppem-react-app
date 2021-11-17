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

const Home = () => {
    useEffect(() => {
        scrollTo("root");
    }, [scrollTo]);

    return (
        <div className="home">
            <NavBar/>
            <Intro/>
            <TaalVakanties/>
            <InscriptionForm/>
            <Pricing/>
            <Gallery/>
            <FAQ/>
            <Testimonial/>
            <Contact/>
            <Footer/>
        </div>
    );
};

export default Home;
