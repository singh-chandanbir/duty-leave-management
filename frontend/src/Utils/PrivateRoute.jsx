import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { account } from "../Appwrite/config";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates loading

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await account.get();
        console.log("User authenticated:", response);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("User not authenticated:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  // Show a loading spinner or placeholder while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Render the appropriate route based on authentication status
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export { PrivateRoute };
