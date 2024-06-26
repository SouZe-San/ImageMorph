// import React from 'react'
import { Link } from "react-router-dom";
import "./error_style.scss";
const _404 = () => {
  return (
    <section className="errorPage_section w-screen h-screen relative overflow-auto flex justify-center items-center">
      <h1 className=" text_404">
        404 <br />
        404
      </h1>
      <h1 className=" text_404">
        404 <br /> 404{" "}
      </h1>
      <h1 className=" text_404">404</h1>
      <h1 className=" text_404">404</h1>

      <Link to={"/"} className="circle flex justify-center items-center ">
        <h1>
          Back to <br /> home
        </h1>
      </Link>
    </section>
  );
};

export default _404;
