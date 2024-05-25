// import React from 'react'
import { useState } from "react";

import "./styles.scss";
import Container from "../../components/ai-services/Container";
const Page = () => {
  const [activeButton, setActiveButton] = useState(0);

  return (
    <section className="ai_services">
      <header>
        <h1 className="">Craft visions</h1>
        <h1 className="ml-24">forge creations</h1>
      </header>
      <div className="btn_section flex justify-end items-center gap-6 py-4">
        <div
          className={activeButton === 0 ? "active_btn btn" : "btn"}
          onClick={() => setActiveButton(0)}
        >
          <button>Image Generation</button>
        </div>
        <div
          className={activeButton === 1 ? "active_btn btn" : "btn"}
          onClick={() => setActiveButton(1)}
        >
          <button>Image Modification</button>
        </div>
        <div
          className={activeButton === 2 ? "active_btn btn" : "btn"}
          onClick={() => setActiveButton(2)}
        >
          <button>Sketch colorization</button>
        </div>
      </div>
      <div className="horizontal_divider"></div>
      <Container apiType={activeButton} />
    </section>
  );
};

export default Page;
