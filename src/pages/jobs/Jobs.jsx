import React from "react";
import Intro from "../intro/Intro";
import JobsForm from "./JobsForm";
import NavigationExternal from "../navigation/NavigationExternal";

const Jobs = () => {
  return (
    <div>
      <NavigationExternal/>
      <Intro/>
      <JobsForm/>
    </div>
  );
};

export default Jobs;
