// import React from "react";
import ServicesImage from "./ServicesImage";
import "./style.scss";
import ima1 from "../../assets/images/service-section/image01.png";
import ima2 from "../../assets/images/service-section/Image2image.png";
import ima3 from "../../assets/images/service-section/image03.png";
import PosterBlock from "./PosterBlock";
import { useEffect, useRef, useState } from "react";
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

  const posterRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState<number>(0);

  let refs: (HTMLDivElement | null)[] = [];

  document.addEventListener("DOMContentLoaded", () => {
    refs = [posterRef.current, ...servicesRef.current];
  });

  const checkVisibleItems = () => {
    // Combine refs into a new array
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();

      refs.forEach((ref) => {
        if (ref) {
          const itemRect = ref.getBoundingClientRect();
          // Check if the item is within the container's bounds
          if (itemRect.left < containerRect.right && itemRect.right > containerRect.left) {
            setVisibleIndex(refs.indexOf(ref));
          }
        }
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("scrollend", checkVisibleItems);
      // Initial check
      checkVisibleItems();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkVisibleItems);
      }
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth > 500) {
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
    }
  }, []);

  return (
    <section className="relative">
      <section className="w-full relative " id="services" ref={containerRef}>
        <div
          ref={posterRef}
          className="w-full sm:h-[102vh] h-[90vh] flex relative justify-center items-center services_poster"
        >
          <h1 className="logoTag">ImageMorph</h1>
          <h1 className="logoTag">ImageMorph</h1>
          <h1 className="logoTag">ImageMorph</h1>
          <PosterBlock />
        </div>
        {servicesDetails.map((service, index) => (
          <div
            className="w-full h-screen serviceItemMobile"
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
      <div className="sectionNavI absolute sm:hidden flex">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`sectionNavItem ${index === visibleIndex ? "active" : ""}`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Container;
