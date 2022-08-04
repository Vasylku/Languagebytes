import React from "react";
import Particles, { ISourceOptions } from "react-tsparticles";
import configParticles from "../../components/particles/configParticles";
import "./landing-page.css";

export const HomeCard = ({
  backgroundColor,
  title,
  textLight,
  text,
  img,
  alt,
}) => {
  return (
    <>
      <Particles options={configParticles as unknown as ISourceOptions} id="particles-home" />
      <div className={backgroundColor ? 'home-main-container lighter' : 'home-main-container darker'}>
        <div className='home-col'>
          <div className={textLight ? "home-body-text" : "home-body-text light"}>
            {title}
          </div>
          <p className={textLight ? "home-body-text" : "home-body-text light"}>
            {text}
          </p>
          <div className='home-img-wrapper'>
            <img src={img} alt={alt} className='home-back-img' />
          </div>
        </div>
      </div>
    </>
  );
}


