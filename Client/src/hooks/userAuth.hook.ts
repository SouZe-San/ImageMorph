import { useContext, useDebugValue } from "react";
import AuthContext from "../contexts/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);
  const { auth } = context;
  useDebugValue(auth, (auth) => (auth?.accessToken ? "Logged In" : "Logged Out"));
  return context;
};

export default useAuth;
