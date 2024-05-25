// import React from 'react'
import Exhibition from "../../components/Exhibition-section/Container";
import AboutSection from "../../components/about-section/AboutSection";
import HeroSection from "../../components/hero-section/HeroSection";
import ServiceSection from "../../components/service-section/Container";
import ContactSection from "../../components/contact-section/Container";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <Exhibition />
      <ContactSection />
    </div>
  );
};

export default Home;
