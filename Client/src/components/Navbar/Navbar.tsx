import { useEffect, useRef, useState } from "react";
import "./nav_style.scss";
import userIcon from "../../assets/icons/user-icon01.svg";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg from "../../assets/images/Nav-svg/btn-bg.svg";
import { Link, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuth from "../../hooks/userAuth.hook";
import MobileNav from "./MobileNav";

gsap.registerPlugin(ScrollTrigger);
const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const [isMenuClick, setMenuClick] = useState<boolean>(false);

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

  useEffect(() => {
    if (!auth?.accessToken) {
      const accessToken = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");

      if (accessToken) {
        setAuth({ accessToken, loggedInUser: user });
        const decodedToken = jwtDecode(accessToken);
        if (typeof decodedToken.exp === "number") {
          if (decodedToken.exp * 1000 < new Date().getTime()) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
          }
        }
      }
    }
  }, [setAuth, auth?.accessToken]);

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
    <nav className="sm:px-16 px-4" id="navbar" ref={navRef}>
      <div className="border_nav sm:block hidden">
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

      <MobileNav navItems={navItems} isMenuClick={isMenuClick} setMenuClick={setMenuClick} />

      <button
        className={`menuNavN-button ${isMenuClick ? "active" : ""} sm:hidden flex`}
        onClick={() => setMenuClick(!isMenuClick)}
      >
        <span></span>
        <span></span>
      </button>
      <div className="auth_btn_section flex items-center ">
        {auth?.accessToken ? (
          <Link className="text innerPadded_btn profileBtn" to="/profile">
            {auth.loggedInUser}
          </Link>
        ) : (
          <Link className="text innerPadded_btn" to="/auth">
            Become A Member
          </Link>
        )}
        <div className="auth_icon ">
          <img src={userIcon} className="icon" loading="lazy" alt="Icon" />
        </div>
        <img src={bg} className="absolute -z-[1]" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
