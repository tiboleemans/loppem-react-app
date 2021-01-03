import React, {useEffect} from "react";
import {scrollTo} from "../utils";
import NavBar from "../components/NavBar";
import Intro from "./Intro";
import TaalVakanties from "./TaalVakanties";
import OverOns from "./OverOns";
import InscriptionForm from "./Inscriptions/InscripionForm";
import ContactForm from "../contact";
import Pricing from "./Pricing";

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
            <ContactForm />
        </div>
    );
};

export default Home;
