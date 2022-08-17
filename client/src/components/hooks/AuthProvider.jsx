import { createContext, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../utils/useLocalStorage";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  console.log(user, "user from auth provider");
  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth }