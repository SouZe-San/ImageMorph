import { useEffect, useRef, useState } from "react";
import "./nav_style.scss";
import userIcon from "../../assets/icons/user-icon01.svg";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg from "../../assets/images/Nav-svg/btn-bg.svg";
import { Link, useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);
const Navbar = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/#about" },
    { name: "Services", link: "/services" },
    { name: "Exhibition", link: "/#exhibition" },
  ];

  const [activeNavButton, setActiveNavButton] = useState("/");
  const navRef = useRef(null);
  const location = useLocation();

  const path = location.pathname;
  const hash = location.hash;
  useEffect(() => {
    setActiveNavButton(`${path}${hash}`);
  }, [path, hash]);

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, hash]);

  useGSAP(() => {
    const navbar = navRef.current;

    gsap.to(navbar, {
      y: 0,
      duration: 0,
    });

    // Show/hide navbar on scroll
    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        gsap.to(navbar, {
          y: self.direction === 1 ? -130 : 0,
          duration: 0.5,
        });
      },
    });
  });

  return (
    <nav className="px-16" id="navbar" ref={navRef}>
      <div className="border_nav">
        <div className="main_nav flex items-center">
          {navItems.map((item, index) => (
            <div
              className={
                item.link === activeNavButton
                  ? "nav_item innerPadded_btn active_NavLink"
                  : "nav_item innerPadded_btn"
              }
              key={index}
            >
              <div className="nav_link">
                <Link to={item.link}>{item.name}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="auth_btn_section flex items-center ">
        <Link className="text innerPadded_btn" to="/auth">
          Become A Member
        </Link>
        <div className="auth_icon ">
          <img src={userIcon} className="icon" loading="lazy" alt="Icon" />
        </div>
        <img src={bg} className="absolute -z-[1]" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
