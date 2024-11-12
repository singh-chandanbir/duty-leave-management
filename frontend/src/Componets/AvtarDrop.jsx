import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AvtarDrop = () => {
  const { removeUser, removeToken, user } = useContext(AuthContext);
  const handleLogout = () => {
    removeUser();
    removeToken();
    window.location.href = "/";
    toast.success("Logout Successful");
  };
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={
              user?.avatar ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li>
          <Link to="/dashboard" className="justify-between">
            Dashboard
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default AvtarDrop;
