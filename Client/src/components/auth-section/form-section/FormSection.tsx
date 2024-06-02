/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

import { logIn, singIn } from "../../../api/axios";
import useAuth from "../../../hooks/userAuth.hook";

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

interface ILoginUser {
  email: string;
  password: string;
}
interface IRegisterUser {
  email: string;
  password: string;
  username: string;
}

interface IRexEx {
  username: RegExp;
  password: RegExp;
  email: RegExp;
}
type TRegexPatterns = "username" | "password" | "email";
// Define the validation patterns
const patterns: IRexEx = {
  username: /^[a-z\d]{5,12}$/i,
  password: /^[\d\w@-]{8,20}$/i,
  email: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
};

enum regexErrorMassage {
  username = "Username must be between 5 to 12 characters and Have no special characters",
  password = "Password must be between 8 to 20 characters and Have no special characters except @ and -",
  email = "Please enter a valid email address,Format is not correct",
}

const FormSection = ({ setIsSignIn, isSignIn }: IFormSection) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userName, setUserName] = useState<undefined | string>(undefined);
  const [email, setEmail] = useState<undefined | string>(undefined);
  const [password, setPassword] = useState<undefined | string>(undefined);
  const [errors, setErrors] = useState({ username: "", password: "", email: "" });

  const navigate = useNavigate();
  const { setAuth } = useAuth();
  useEffect(() => {
    const pass = document.getElementById("password");
    if (isPasswordVisible) {
      (pass as HTMLInputElement).type = "text";
    } else {
      (pass as HTMLInputElement).type = "password";
    }
  }, [isPasswordVisible]);

  // Function to validate the inputs
  const validate = (name: TRegexPatterns, value: string) => {
    if (value !== "") {
      if (!patterns[name].test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: regexErrorMassage[name as keyof typeof regexErrorMassage] || `Invalid ${name}`,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    } else setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const OnFormSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (!isSignIn) {
      console.log("LogIn");
      if (!email || !password) {
        alert("Please fill all the fields");
        return;
      }

      if (!patterns["email"].test(email) || !patterns["password"].test(password)) {
        alert("Invalid Email or Password");
      }
      const userData: ILoginUser = {
        email,
        password,
      };
      try {
        console.log("userData: ", userData);
        const { data } = await logIn(userData);
        const { loggedInUser, accessToken } = data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", loggedInUser.username);
        setAuth({ loggedInUser: loggedInUser.username, accessToken });
        navigate("/");
      } catch (error: any) {
        if (!error?.response?.status) {
          alert("No Server Response");
        } else if (error?.response?.status === 400) {
          alert("Missing Username or Password");
        } else if (error?.response?.status === 403) {
          alert("Unauthorized");
        } else {
          alert("Login Failed");
        }
        console.log("Log In failed !! ", error);
      }
    } else {
      console.log("Registration");
      if (!userName || !email || !password) {
        alert("Please fill all the fields");
        return;
      }
      if (
        !patterns["email"].test(email) ||
        !patterns["password"].test(password) ||
        !patterns["username"].test(userName)
      ) {
        alert("Invalid Email or Password or Username");
      }
      const registerData: IRegisterUser = {
        username: userName,
        email,
        password,
      };
      try {
        await singIn(registerData);
        console.log("registerData: ", registerData);
        setIsSignIn(!isSignIn);
      } catch (error: any) {
        console.log("error from register: ", error);
        if (!error?.response?.status) {
          alert("No Server Response");
        } else if (error?.response?.status === 404) {
          alert("Missing Username or Password");
        } else if (error?.response?.status === 403) {
          alert("Unauthorized");
        } else {
          alert("Login Failed");
        }
        console.log("Log In failed !! ");
      }
    }
  };

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
                  validate("username", e.target.value);
                }}
              />
              <label htmlFor="userName">UserName</label>
              <img src={userIcon} alt="" />
              <h5 className="verification" id="userName">
                {errors.username}
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
                validate("email", e.target.value);
              }}
            />
            <label htmlFor="email">Email</label>
            <img src={mailIcon} alt="" />
            <h5 className="verification" id="email">
              {errors.email}
            </h5>
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
                validate("password", e.target.value);
              }}
            />
            <label htmlFor="password">Password</label>
            <img
              src={isPasswordVisible ? unLockedLock : lockedLock}
              alt=""
              className="cursor-pointer"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />

            <h5 className="verification" id="password">
              {errors.password}
            </h5>
          </div>

          <div className=" submitBtn flex mt-4 justify-start items-center">
            <button type="submit" className="" onClick={OnFormSubmit}>
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
