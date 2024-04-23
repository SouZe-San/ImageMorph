// import React from 'react'
import PulsButton from "./PulsButton";
import ScrollSection from "./ScrollSection";
import "./hero_style.scss";

const HeroSection = () => {
  return (
    <section id="home" className="relative  overflow-hidden ">
      <div className="blurBg"></div>
      <main className="px-16">
        <div className="mainSection flex w-full items-end ">
          <div className="small_quote relative">
            <span className="square_brackets absolute">[</span>
            <p>
              <span className="text-[2.5rem]">W</span>here dreams take flight on the canvas of
              reality, and innovation dances hand in hand with exploration
            </p>
            <span className="square_brackets absolute">]</span>
          </div>

          <div className="hero_heading pl-16">
            <h1 className="text-9xl font-bold">
              <span className="ml-16"></span>Manifest Your{" "}
            </h1>
            <h1 className="text-7xl font-bold">
              Imagination{" "}
              <span className="product_name">
                [<span className="px-4">ImageMorph</span>]
              </span>
            </h1>
            <h1 className="text-8xl font-bold">
              Turns <span>Ideas into Reality !!</span>
            </h1>
          </div>
        </div>
      </main>

      {/* Sign up Button With Plus Style */}
      <PulsButton />
      {/* right Scroll reminder */}
      <ScrollSection />
    </section>
  );
};

export default HeroSection;
