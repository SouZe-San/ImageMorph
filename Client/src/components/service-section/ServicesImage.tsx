// import React from 'react'

import PromptSection from "../prompt-section/PromptSection";

const ServicesImage = (props: IServicesDetails) => {
  return (
    <div className="horizontal_item_container flex w-full h-full">
      <div className="horizontal_left_item">
        <h2 className="">{props.MainTitle}</h2>

        <h5 className="pb-8">{props.subText}</h5>
        <div className="">
          <p>{props.description}</p>
        </div>

        <button className="horizontal_left_item_btn"> JUMP ON</button>
      </div>
      <div className="horizontal_right_item relative">
        <img src={props.src} alt="Images" />
        <PromptSection promptText={props.promptText} />
      </div>
    </div>
  );
};

export default ServicesImage;
