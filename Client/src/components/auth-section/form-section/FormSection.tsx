import { useState, useEffect } from "react";

import google from "../../../assets/icons/auth/google-icon.svg";
import facebook from "../../../assets/icons/auth/facebook-icon.svg";

// icons import
import lockedLock from "../../../assets/icons/auth/locked-lock.svg";
import unLockedLock from "../../../assets/icons/auth/unlocked-lock.svg";
import mailIcon from "../../../assets/icons/mail-icon.svg";
import userIcon from "../../../assets/icons/user-icon01.svg";

interface IFormSection {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
  isSignIn: boolean;
}

const FormSection = ({ setIsSignIn, isSignIn }: IFormSection) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userName, setUserName] = useState<undefined | string>(undefined);
  const [email, setEmail] = useState<undefined | string>(undefined);
  const [password, setPassword] = useState<undefined | string>(undefined);

  useEffect(() => {
    const pass = document.getElementById("password");
    if (isPasswordVisible) {
      (pass as HTMLInputElement).type = "text";
    } else {
      (pass as HTMLInputElement).type = "password";
    }
  }, [isPasswordVisible]);

  return (
    <div className="sign-section-right-form_section  grow">
      <div className="headTag">
        <h1>
          {isSignIn ? "Enter Your" : "Return to Your"} <span>Visual Playground</span>
        </h1>
        <h5>{isSignIn ? "Sign in to Start Crafting Magic" : "Log in to Start Crafting Again"}</h5>
      </div>
      <div className={`formPart ${isSignIn ? "mt-16" : "mt-24"}`}>
        <form action="" method="post">
          {isSignIn && (
            <div className="inputBlock">
              <input
                type="text"
                name="userName"
                value={userName}
                id="userName"
                placeholder=""
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <label htmlFor="userName">UserName</label>
              <img src={userIcon} alt="" />

              <h5 className="verification" id="userName">
                {" "}
              </h5>
            </div>
          )}
          <div className="inputBlock">
            <input
              type="email"
              name="email"
              value={email}
              placeholder=""
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="email">Email</label>
            <img src={mailIcon} alt="" />
            <h5 className="verification" id="email"></h5>
          </div>
          <div className="inputBlock">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder=""
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="password">Password</label>
            <img
              src={isPasswordVisible ? unLockedLock : lockedLock}
              alt=""
              className="cursor-pointer"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />

            <h5 className="verification" id="password"></h5>
          </div>

          <div className=" submitBtn flex mt-4 justify-start items-center">
            <button type="submit" className="">
              {isSignIn ? "Sign In" : "Log In"}
            </button>
          </div>
        </form>
      </div>

      <div className="divider mt-9 flex items-center">
        <span></span>
        <h5 className=" mx-2">Or Connect with</h5>
        <span></span>
      </div>

      <div className="alternative_connection  mt-6">
        <div className="btnBox flex items-center justify-center">
          <div className="icon">
            <img src={google} alt="" />
          </div>
          <div className="text">
            <h5>Google</h5>
          </div>
        </div>
        <div className="btnBox flex items-center justify-center">
          <div className="icon">
            <img src={facebook} alt="" />
          </div>
          <div className="text">
            <h5>Facebook</h5>
          </div>
        </div>
      </div>

      <div className="redirect_section mt-4">
        <h5>
          {isSignIn ? " Already have an account?" : "New Here?"}{" "}
          <span onClick={() => setIsSignIn(!isSignIn)}> {!isSignIn ? "Sign In" : "Log In"}</span>
        </h5>
      </div>
    </div>
  );
};

export default FormSection;
