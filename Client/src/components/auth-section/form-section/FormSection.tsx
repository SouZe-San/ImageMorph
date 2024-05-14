import google from "../../../assets/icons/auth/google-icon.svg";
import facebook from "../../../assets/icons/auth/facebook-icon.svg";

// icons import
import lockedLock from "../../../assets/icons/auth/locked-lock.svg";
// import unLockedLock from '..././../assets/icons/auth/unlocked-lock.svg'
import mailIcon from "../../../assets/icons/mail-icon.svg";
import userBold from "../../../assets/icons/auth/user-bold.svg";
import userIcon from "../../../assets/icons/user-icon01.svg";

interface IFormSection {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
  isSignIn: boolean;
}

const FormSection = ({ setIsSignIn, isSignIn }: IFormSection) => {
  return (
    <div className="sign-section-right-form_section  grow">
      <div className="headTag">
        <h1>
          Enter Your <span>Visual Playground</span>
        </h1>
        <h5>Sign in to Start Crafting Magic</h5>
      </div>
      <div className="formPart mt-12">
        <form action="" method="post">
          <div className="inputBlock">
            <label htmlFor="fullName">Full Name</label>
            <div className="input">
              <input type="fullName" name="fullName" />
              <img src={userIcon} alt="" />
            </div>
            <h5 className="verification" id="fullName"></h5>
          </div>
          <div className="inputBlock">
            <label htmlFor="userName">UserName</label>
            <div className="input">
              <input type="userName" name="userName" />
              <img src={userBold} alt="" />
            </div>
            <h5 className="verification" id="userName">
              {" "}
            </h5>
          </div>
          <div className="inputBlock">
            <label htmlFor="email">Email</label>
            <div className="input">
              <input type="email" name="email" />
              <img src={mailIcon} alt="" />
            </div>
            <h5 className="verification" id="email"></h5>
          </div>
          <div className="inputBlock">
            <label htmlFor="password">Password</label>
            <div className="input">
              <input type="password" name="password" />
              <img src={lockedLock} alt="" className="cursor-pointer" />
            </div>
            <h5 className="verification" id="password"></h5>
          </div>

          <div className=" submitBtn flex justify-start items-center">
            <button type="submit" className="">
              Sign In
            </button>
          </div>
        </form>
      </div>

      <div className="divider mt-9 flex items-center">
        <span></span>
        <h5 className=" mx-2">Or Connect with</h5>
        <span></span>
      </div>

      <div className="alternative_connection ">
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
          Already have an account? <span onClick={() => setIsSignIn(!isSignIn)}>Log In</span>
        </h5>
      </div>
    </div>
  );
};

export default FormSection;
