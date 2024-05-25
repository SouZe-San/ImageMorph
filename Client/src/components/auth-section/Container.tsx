import { useEffect, useState } from "react";
import signInImage from "../../assets/images/auth-section/entry-min.jpg";
import logInImage from "../../assets/images/auth-section/ai-conqure.webp";
import FormSection from "./form-section/FormSection";
const Container = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  useEffect(() => {
    const print = setTimeout(() => {
      console.log("Sign In is Open: ", isSignIn);
    }, 1000);

    return () => {
      clearTimeout(print);
    };
  }, [isSignIn]);

  return (
    <>
      <FormSection setIsSignIn={setIsSignIn} isSignIn={isSignIn} />
      <div className="sign-section-right-image_section w-2/5 grow-0 ">
        <img src={isSignIn ? signInImage : logInImage} alt="sign-in-section-image" />
      </div>
    </>
  );
};

export default Container;
