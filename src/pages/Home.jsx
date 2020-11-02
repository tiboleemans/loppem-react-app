import React, {useEffect} from "react";
import {scrollTo} from "../utils";
import TopBar from "../components/NavBar";
import Intro from "./Intro";
import TaalVakanties from "./TaalVakanties";
import OverOns from "./OverOns";
import InscriptionForm from "./Inscriptions/InscripionForm";

const Home = () => {
    useEffect(() => {
        scrollTo("root");
    }, [scrollTo]);

    return (
        <div className="home">
            <TopBar/>
            <Intro/>
            <TaalVakanties/>
            <OverOns/>
            <InscriptionForm/>
        </div>
    );
};

export default Home;
