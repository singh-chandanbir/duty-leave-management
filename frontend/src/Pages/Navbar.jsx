import { useContext } from "react";
import AvtarDrop from "../Componets/AvtarDrop";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Duty Leave Managemnt Portal
        </Link>
      </div>
      <div className="flex-none">
        {user ? (
          <AvtarDrop />
        ) : (
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
