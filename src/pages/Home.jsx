import React, {useEffect} from "react";
import {scrollTo} from "../utils";
import TopBar from "../components/NavBar";
import Inscription from "./Inscriptions/Inscription";

const Home = () => {
  useEffect(() => {
    scrollTo("root");
  }, [scrollTo]);

  return (
    <div className="home">
      <TopBar />
      <Inscription />
    </div>
  );
};

export default Home;
