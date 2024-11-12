import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const [token, setTokenState] = useState(
    JSON.parse(localStorage.getItem("token")) || null,
  );

  const setToken = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    setTokenState(token);
  };
  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUserState(user);
  };

  const removeUser = () => {
    localStorage.removeItem("user");
    setUserState(null);
  };

  const data = {
    user,
    token,
    setUser,
    removeUser,
    setToken,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
