import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { BackendURL } from "../Constants";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { user, setUser, setToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(BackendURL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const jsonRes = await res.json();

    if (jsonRes.success === false) {
      toast.error(jsonRes.message);
    } else {
      setUser(jsonRes.user);
      setToken(jsonRes.token);
      toast.success("Login Successful");
      // navigate to the dashboard
      <Navigate to="/dashboard" />;
    }
  };
  return (
    <div className="hero bg-base-200 min-h-[85vh]">
      {/* <div className="hero-content flex-col lg:flex-row-reverse"> */}
      <div className="hero-content min-w-[90%] flex flex-col">
        <div className="text-center min-w-[80%] lg:text-left">
          <h1 className="text-5xl text-center font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button onClick={handleSubmit} className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
