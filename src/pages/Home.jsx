import React, {useEffect} from "react";
import {scrollTo} from "../utils";
import TopBar from "../components/NavBar";
import Inscription from "./Inscriptions/Inscription";
import Intro from "./Intro";

const Home = () => {
  useEffect(() => {
    scrollTo("root");
  }, [scrollTo]);

  return (
    <div className="home">
      <TopBar />
      <Intro />
      <Inscription />
    </div>
  );
};

export default Home;
