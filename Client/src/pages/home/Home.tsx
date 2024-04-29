// import React from 'react'
import AboutSection from "../../components/about-section/AboutSection";
import HeroSection from "../../components/hero-section/HeroSection";
import ServiceSection from "../../components/service-section/Container";
import "./home_style.scss";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServiceSection />
    </div>
  );
};

export default Home;
