import { Link } from "react-router-dom";

// import React from 'react'

const PulsButton = () => {
  return (
    <div className="plusBtn w-full flex justify-center items-center">
      <div className="puls flex justify-center items-center">
        <span></span>
        <span></span>
        <Link className="btn" to="/auth">
          <h1>
            <span>S</span>ign
          </h1>
          <h1>
            <span>U</span>p
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default PulsButton;
