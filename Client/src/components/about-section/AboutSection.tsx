// import React from 'react'
import Card from "./Card";
import "./style.scss";

import rocketIcon from "../../assets/icons/rocket-icon.svg";
import flagIcon from "../../assets/icons/flag-icon.svg";
import imageIcon from "../../assets/icons/image-icon.svg";
import lampIcon from "../../assets/icons/lamp-icon.svg";
import penIcon from "../../assets/icons/pen-icon.svg";

const Icons = [rocketIcon, flagIcon, imageIcon, lampIcon, penIcon];

const AboutArrays = {
  1: [
    {
      icon: Icons[0],
      title: "Humble One",
      text: "Our platform revolutionizes manga creation by offering intuitive tools and customizable features tailored to mangaka's needs, enhancing their artistic process.",
    },
    {
      icon: Icons[1],
      title: "Start Today",
      text: "With a user-friendly interface designed for simplicity, creators can effortlessly navigate our website, making image-generation a breeze for both beginners and seasoned professionals alike.",
    },
  ],
  2: [
    {
      icon: Icons[3],
      title: "Figure Customization",
      text: "At the core of our mission is the ability to craft bespoke figures, allowing users to tailor every aspect of their creations, from character design to background elements, fostering limitless artistic expression.",
    },
    {
      icon: Icons[4],
      title: "Struggling Mangaka?",
      text: "Leveraging the power of AI as a supportive ally, our platform offers intelligent assistance throughout the creative process, providing valuable insights and suggestions to refine and enhance user-generated content.",
    },
    {
      icon: Icons[2],
      title: "Enhance Vision",
      text: "Leveraging the power of AI as a supportive ally, our platform offers intelligent assistance throughout the creative process, providing valuable insights and suggestions to refine and enhance user-generated content.",
    },
  ],
};

const AboutSection = () => {
  return (
    <section id="about" className="w-full px-8 pb-8 about_section relative ">
      <header className="text-6xl absolute">
        <h1>
          {" "}
          <span className="ml-36"></span> A Little
        </h1>
        <h1>About Us</h1>
      </header>

      <div className="card_container mb-8">
        <div className="card_section">
          <div className="fakeDiv col-span-3"></div>
          {AboutArrays[1].map((card, index) => (
            <Card key={index} icon={card.icon} title={card.title} text={card.text} />
          ))}
        </div>
        <div className="card_section">
          <div className="fakeDiv col-span-2"></div>
          {AboutArrays[2].map((card, index) => (
            <Card key={index} icon={card.icon} title={card.title} text={card.text} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
