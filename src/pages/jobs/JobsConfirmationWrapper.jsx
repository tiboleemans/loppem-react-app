import React from "react";
import Intro from "../intro/Intro";
import NavigationExternal from "../navigation/NavigationExternal";
import JobsConfirmation from "./JobsConfirmation";

const JobsConfirmationWrapper = () => {
  return (
    <div>
      <NavigationExternal/>
      <Intro/>
      <JobsConfirmation/>
    </div>
  );
};

export default JobsConfirmationWrapper;
