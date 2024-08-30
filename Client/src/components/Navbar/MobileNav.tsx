import { Link } from "react-router-dom";
import "./mobileNav_style.scss";
import gsap from "gsap";
import { useEffect } from "react";
interface navItem {
  name: string;
  link: string;
}

interface MobileNavProps {
  navItems: navItem[];
  isMenuClick: boolean;
  setMenuClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav = ({ navItems, isMenuClick, setMenuClick }: MobileNavProps) => {
  const tl = gsap.timeline({ paused: true });

  useEffect(() => {
    const navLink = document.getElementsByTagName("li");

    tl.fromTo(
      navLink,
      {
        y: 10,
        opacity: 0,
        visibility: "hidden",
      },
      {
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        visibility: "visible",
        opacity: 1,
        delay: 1,
      }
    );

    if (isMenuClick) {
      document.body.style.overflow = "hidden";
      tl.play();
    } else {
      document.body.style.overflow = "auto";
      tl.reverse();
    }
  }, [isMenuClick]);

  return (
    <>
      <div
        className={`mobileNav sm:hidden
         ${isMenuClick ? "translate-y-0" : "translate-y-[-150%]"}
         `}
      >
        <ul>
          {navItems.map((item, _index) => {
            return (
              <li>
                <div className="navLink">
                  <Link to={item.link} onClick={() => setMenuClick(!setMenuClick)}>
                    {item.name}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={`divOverlay fixed sm:hidden ${
          isMenuClick ? "translate-y-0" : "translate-y-[150%]"
        }`}
      ></div>
    </>
  );
};

export default MobileNav;
