import React from "react";
import Intro from "../intro/Intro";
import NavigationExternal from "../navigation/NavigationExternal";
import BerlaymontForm from "./BerlaymontForm";

const Berlaymont = () => {
  return (
    <div>
      <NavigationExternal/>
      <Intro/>
      <BerlaymontForm/>
    </div>
  );
};

export default Berlaymont;
