// import React from 'react'
import eyeIcon from "../../assets/icons/eyes-icon.svg";
const PosterBlock = () => {
  return (
    <div className="middleBox w-full text-center">
      <h1 className="capitalize">
        {" "}
        Let's see
        <span className="underLine"></span>{" "}
      </h1>

      <h1 className="flex justify-center items-center">
        {" "}
        <img src={eyeIcon} alt="" />
        <span className=""> What we Have</span>
      </h1>
    </div>
  );
};

export default PosterBlock;
