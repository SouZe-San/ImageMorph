// import React from 'react'
import "./style.scss";
import arrow from "../../assets/icons/arrow.svg";
const PromptSection = (props: { promptText: string }) => {
  return (
    <div className="prompt_section absolute bottom-12 left-9 flex justify-between items-center">
      <h4 className="prompt_text ">{props.promptText}</h4>

      <img src={arrow} alt="" />
    </div>
  );
};

export default PromptSection;
