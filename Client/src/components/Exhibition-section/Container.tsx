// import React from 'react'
import ItemsBlock from "./perblock/ItemsBlock";
import "./style.scss";

import allCharacter from "../../assets/images/view-section/allCharechter.webp";
import swordMan from "../../assets/images/view-section/sword-fighter.webp";
import sleepingBeauty from "../../assets/images/view-section/Sleeping_beauty.webp";
import hunting from "../../assets/images/view-section/hunting.webp";
import CharismaLooking from "../../assets/images/view-section/CharismaLooking-min.webp";
import beautiful from "../../assets/images/view-section/beautiful-women.webp";

const demoCollection = [
  [
    {
      img: allCharacter,
      prompt:
        "A detailed anime-style illustration by Jason Teraoka features a group of people with a robot in the background.  ",
    },
    {
      img: swordMan,
      prompt:
        "a painting of a man with a sword and a bird on his shoulder, by Yang J, inspired by Kanō Hōgai, tsutomu nihei art.",
    },
    {
      img: sleepingBeauty,
      prompt:
        "there is a woman with long hair and flowers in her hair, beautiful digital artwork, beautiful fantasy art portrait, ",
    },
  ],
  [
    {
      img: hunting,
      prompt:
        "A detailed anime-style illustration by Jason Teraoka features a group of people with a robot in the background.  ",
    },
    {
      img: CharismaLooking,
      prompt: "A Charisma Looking Women looking at the  lit matchstick holding in her hand",
    },
    {
      img: beautiful,
      prompt:
        "A Painting of beautiful girl looks back with a happy expression with ware a violet tunic",
    },
  ],
];

const Container = () => {
  return (
    <div className="exhibition-section mb-12">
      <div className="headTag flex items-center ">
        <div className="flex flex-col justify-center items-start w-full onHoverDiv">
          <h1>Sort of</h1>
          <h1> Gallery </h1>
        </div>
      </div>

      <div className="">
        {demoCollection.map((item, index) => (
          <ItemsBlock key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Container;
