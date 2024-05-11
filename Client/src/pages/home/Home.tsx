// import React from 'react'
import Exhibition from "../../components/Exhibition-section/Container";
import AboutSection from "../../components/about-section/AboutSection";
import HeroSection from "../../components/hero-section/HeroSection";
import ServiceSection from "../../components/service-section/Container";
import ContactSection from "../../components/contact-section/Container";
import "./home_style.scss";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <Exhibition />
      <ContactSection />
      <footer className="mt-8 py-4 flex items-center px-24 text-center">This is the footer</footer>
    </div>
  );
};

export default Home;
