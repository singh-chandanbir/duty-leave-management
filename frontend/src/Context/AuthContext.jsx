import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { account } from "../Appwrite/config";

const AuthContext = createContext();

export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const reloadUser = async () => {
    const result = await account.get();
    console.log("result");
    console.log(result);
    setUserState(result);
  };

  useEffect(() => {
    reloadUser();
  }, []);

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
    setUser,
    removeUser,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
