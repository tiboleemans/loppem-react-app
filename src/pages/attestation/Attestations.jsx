import React from "react";
import Intro from "../intro/Intro";
import AttestationsForm from "./AttestationsForm";
import NavigationExternal from "../navigation/NavigationExternal";

const Attestations = () => {
  return (
    <div>
      <NavigationExternal/>
      <Intro/>
      <AttestationsForm/>
    </div>
  );
};

export default Attestations;
