import mailIcon from "../../assets/icons/mail-icon.svg";

import { FbIcon, GithubIcon, InstaIcon, LinkedinIcon, XIcon } from "../social-icons/Icons";

import triangle from "../../assets/icons/triangle-filled-svgrepo-com.svg";
import "./style.scss";
const Container = () => {
  return (
    <section className=" px-24 py-8 w-full flex contact_section">
      <div className="contact_left grow flex flex-col justify-end">
        <div className="social_icons flex flex-col">
          <div className="social-icon">
            <div className="icon">
              <FbIcon />
            </div>
            <div className="social_text">
              {" "}
              <img src={triangle} alt="" /> <h3>Facebook</h3>
            </div>
          </div>
          <div className="social-icon">
            <div className="icon">
              <InstaIcon />
            </div>
            <div className="social_text">
              {" "}
              <img src={triangle} alt="" /> <h3>Instagram</h3>
            </div>
          </div>
          <div className="social-icon">
            <div className="icon">
              <GithubIcon />
            </div>
            <div className="social_text">
              {" "}
              <img src={triangle} alt="" /> <h3>Github</h3>
            </div>
          </div>
          <div className="social-icon">
            {" "}
            <div className="icon">
              <LinkedinIcon />
            </div>
            <div className="social_text">
              <img src={triangle} alt="" />
              <h3>LinkedIn</h3>
            </div>
          </div>
          <div className="social-icon">
            {" "}
            <div className="icon">
              <XIcon />
            </div>
            <div className="social_text">
              {" "}
              <img src={triangle} alt="" /> <h3>X</h3>
            </div>
          </div>
        </div>
        <div className="mailBox mt-4 mb-8">
          <div className="outerDiv">
            <div className="innerDiv flex items-center ">
              <div className="text">
                <h2>
                  <span>image.</span>morph@gmail.com
                </h2>
              </div>
              <div className="middle_space">
                <span className="right_top"></span>
                <span className="right_bottom"></span>
                <span className="left_top"></span>
                <span className="left_bottom"></span>
              </div>
              <div className="mail_icon ">
                <img src={mailIcon} className="icon" loading="lazy" alt="Icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact_right w-4/12 flex flex-col justify-end items-end">
        <h3>Try to</h3>
        <h1>Contact</h1>
        <h1>US</h1>
      </div>
    </section>
  );
};

export default Container;
