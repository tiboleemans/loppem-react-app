import React from "react";
import Navigation from "../navigation/Navigation";
import Intro from "../intro/Intro";
import JobsForm from "./JobsForm";

const Jobs = () => {
  return (
    <div>
      <Navigation/>
      <Intro/>
      <JobsForm/>
    </div>
  );
};

export default Jobs;
