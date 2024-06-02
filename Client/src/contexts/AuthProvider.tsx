import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type AuthState = {
  loggedInUser: string | null;
  accessToken: string | null;
};

type AuthContextType = {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
};

// Define the props type for AuthProvider
type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Initialize state with proper type
  const [auth, setAuth] = useState<AuthState>({
    loggedInUser: null,
    accessToken: null,
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
