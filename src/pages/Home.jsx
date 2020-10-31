import React, {useEffect} from "react";
import {scrollTo} from "../utils";
import TopBar from "../components/NavBar";
import Inscription from "./Inscriptions/Inscription";
import Intro10 from "./Intro10";

const Home = () => {
  useEffect(() => {
    scrollTo("root");
  }, [scrollTo]);

  return (
    <div className="home">
      <TopBar />
      <Intro10 />
      <Inscription />
    </div>
  );
};

export default Home;
