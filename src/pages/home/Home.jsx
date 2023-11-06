import React from "react";
import Navigation from "../navigation/Navigation";
import Intro from "../intro/Intro";
import Vacations from "../vacations/Vacations";
import InscriptionForm from "../inscription-form/InscripionForm";
import Pricing from "../pricing/Pricing";
import PracticalInfo from "../practical-info/PracticalInfo";
import Contact from "../contact/Contact";
import RatingBanner from "../banners/RatingBanner";
import BringAFriend from "../banners/BringAFriend";
import Interest from "../banners/Interest";
import QuestionBanner from "../banners/QuestionBanner";

const Home = () => {
  return (
    <div>
      <Navigation/>
      <Intro/>
      <Vacations/>
      <RatingBanner/>
      <Pricing/>
      <BringAFriend/>
      <InscriptionForm/>
      <Interest/>
      <PracticalInfo/>
      <QuestionBanner/>
      <Contact/>
    </div>
  );
};

export default Home;
