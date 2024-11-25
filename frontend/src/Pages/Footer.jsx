import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Guru
          Nanak Dev Engineering College
        </p>
      </aside>
      <Link to="/admin-dashboard">Admin Dashboard</Link>
    </footer>
  );
};

export default Footer;
