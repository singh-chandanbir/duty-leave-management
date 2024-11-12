import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="hero bg-base-200 min-h-[85vh]">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://gndec.ac.in/sae/img/logo.png"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">
            Gndec&apos;s Duty Leave Managment sysytem
          </h1>
          <p className="py-6">
            {/* gerete contect  */}
            Welcome to Guru Nanak Dev Engineering College&apos;s Duty Leave
            Managment System. This system is designed to help the faculty and
            staff of the college to apply for duty leaves and get them approved
            by the authorities. The system also allows the authorities to keep
            track of
          </p>
          <Link to="/login" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
