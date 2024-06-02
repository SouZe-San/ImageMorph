import { useEffect, useState } from "react";
import useAuth from "../../hooks/userAuth.hook";
import "./style.scss";
import logOutBtn from "../../assets/icons/auth/logout-icon.svg";
import { currentUser, logOut } from "../../api/axios";
import { useNavigate } from "react-router-dom";

interface IUserDetails {
  username: string;
  email: string;
}

const Page = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState<IUserDetails>({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (!auth.accessToken) {
      navigate("/auth");
    }

    currentUser().then(({ data }) => {
      console.log(data);
      setUser({
        username: data.data.username,
        email: data.data.email,
      });
    });
  }, [auth.accessToken, navigate]);

  const handleLogOut = async () => {
    try {
      await logOut();
      setAuth({
        accessToken: null,
        loggedInUser: null,
      });
      setUser({
        username: "",
        email: "",
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="profileSection px-20">
      <div className="headerTag">
        <h1>
          Welcome to our playground! <span>{auth.loggedInUser}</span>
        </h1>
        <h3>Let's Explore and create!</h3>
      </div>

      <div className="userCard flex gap-4 mt-16">
        <div className="userinfo relative grow-0">
          <div className="userDetails">
            <div className="circle">{auth.loggedInUser?.charAt(0).toUpperCase()}</div>
            <div className="info mt-8">
              <h2>
                UserName : <span>{user.username}</span>
              </h2>
              <h2>
                User Email : <span>{user.email}</span>
              </h2>
            </div>
            <button
              className={`logout flex items-center justify-center mt-8 ${
                user.username === "" ? "disabled" : ""
              }`}
              onClick={handleLogOut}
              disabled={user.username === ""}
            >
              <div className="icon">
                <img src={logOutBtn} alt="" />
              </div>
              <div className="text">
                <h5>Log-Out</h5>
              </div>
            </button>
          </div>
        </div>
        <div className="userGallery grow relative">
          <h2>Collection</h2>

          <div className="absolute backTag">Currently None</div>
        </div>
      </div>
    </section>
  );
};

export default Page;
