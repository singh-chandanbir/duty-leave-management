import { Outlet } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Navbar from "./Pages/Navbar";
import Footer from "./Pages/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Outlet />
      </AuthProvider>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default Layout;
