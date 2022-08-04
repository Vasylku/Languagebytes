import React from "react";
import "../landing-page/landing-page.css";
import '../../App.css';
import { HomeCard } from "./home-card";
import { homeInfoOne, homeInfoTre, homeInfoTwo } from "./homeInfo";


export const LandingPage = () => {
  return (
   <>
        <HomeCard {...homeInfoOne}/>
        <HomeCard {...homeInfoTwo}/>
        <HomeCard {...homeInfoTre}/>   
  </>
  )
};
