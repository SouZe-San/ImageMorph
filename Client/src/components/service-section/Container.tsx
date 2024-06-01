// import React from "react";
import ServicesImage from "./ServicesImage";
import "./style.scss";
import ima1 from "../../assets/images/service-section/image01.png";
import ima2 from "../../assets/images/service-section/Image2image.png";
import ima3 from "../../assets/images/service-section/image03.png";
import PosterBlock from "./PosterBlock";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const servicesDetails: IServicesDetails[] = [
  {
    MainTitle: "Narrative Illustration",
    subText: "Image Generation",
    description:
      "Give your thoughts to Run and Create Characters, Creatures, and more.Simply describe your character, and the image generator brings them to life before your eyes. From their appearance to their personality traits, just provide the details, and watch as your character manifests in vivid detail, ready to inhabit your story or artwork.",
    src: ima1,
    promptText: "A vile octopus Creature with human lower part",
  },
  {
    MainTitle: "Visual Morphology",
    subText: "Image Modification",
    description:
      "Transform your characters with ease. Submit an image and specify the alterations you desire, from posture to expression and even day-to-night transitions. Watch as your character seamlessly evolves to reflect your vision, ready to breathe life into your narratives and artwork.",
    src: ima2,
    promptText: "Transform environment from day to night",
  },
  {
    MainTitle: "ChromaSketch Forge",
    subText: "Sketch colorization",
    description:
      "Transform your characters with ease. Submit an image and specify the alterations you desire, from posture to expression and even day-to-night transitions. Watch as your character seamlessly evolves to reflect your vision, ready to breathe life into your narratives and artwork.",
    src: ima3,
    promptText: "colorize like a old castle in story tell",
  },
];

const Container = () => {
  const servicesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    servicesRef.current.forEach((ele, index) => {
      gsap.fromTo(
        ele,
        {
          clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 150% 100%)",
        },
        {
          clipPath: "polygon(-100% 0%, 100% 0%, 100% 100%, -25% 100%)",
          duration: 6,
          delay: index * 0.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ele,
            start: `top 90%`,
            end: `+=${ele.clientHeight}`,
            scrub: 0.5,
            // markers: true,
          },
        }
      );
    });
  }, []);

  return (
    <section className="w-full relative " id="services">
      <div className="w-full h-[102vh] flex relative justify-center items-center services_poster">
        <h1 className="logoTag">ImageMorph</h1>
        <h1 className="logoTag">ImageMorph</h1>
        <h1 className="logoTag">ImageMorph</h1>
        <PosterBlock />
      </div>
      {servicesDetails.map((service, index) => (
        <div
          className="w-full h-screen"
          key={index}
          ref={(ele) => (servicesRef.current[index] = ele as HTMLDivElement)}
        >
          <ServicesImage
            MainTitle={service.MainTitle}
            subText={service.subText}
            description={service.description}
            src={service.src}
            promptText={service.promptText}
          />
        </div>
      ))}
    </section>
  );
};

export default Container;
