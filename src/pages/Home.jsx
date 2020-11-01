import React, {useEffect} from "react";
import {scrollTo} from "../utils";
import TopBar from "../components/NavBar";
import Inscription from "./Inscriptions/Inscription";
import Intro from "./Intro";
import TaalVakanties from "./TaalVakanties";

const Home = () => {
  useEffect(() => {
    scrollTo("root");
  }, [scrollTo]);

  return (
    <div className="home">
      <TopBar />
      <Intro />
      <TaalVakanties />
      <Inscription />
    </div>
  );
};

export default Home;
