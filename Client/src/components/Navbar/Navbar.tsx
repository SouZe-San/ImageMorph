// import React from 'react'
import "./nav_style.scss";
import userIcon from "../../assets/icons/user-icon01.svg";
const Navbar = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Exhibition", link: "/exhibition" },
  ];
  return (
    <nav className="px-16">
      <div className="border_nav">
        <div className="main_nav flex items-center">
          {navItems.map((item, index) => (
            <div className={index === 0 ? "nav_item active_NavLink" : "nav_item"} key={index}>
              <div className="nav_link">
                <a href={item.link}>{item.name}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="auth_btn_section flex items-center ">
        <div className="text">
          <span>Become A Member</span>
        </div>
        <div className="middle_space">
          <span className="right_top"></span>
          <span className="right_bottom"></span>
          <span className="left_top"></span>
          <span className="left_bottom"></span>
        </div>
        <div className="auth_icon ">
          <img src={userIcon} className="icon" loading="lazy" alt="Icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
