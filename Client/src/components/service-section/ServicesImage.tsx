// import React from 'react'

import arrow from "../../assets/icons/arrow.svg";
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
        <div className="prompt_section absolute bottom-12 left-9 flex justify-between items-center">
          <h4 className="prompt_text ">{props.promptText}</h4>

          <img src={arrow} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ServicesImage;
