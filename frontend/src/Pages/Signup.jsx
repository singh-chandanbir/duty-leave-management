import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { account, ID } from "../Appwrite/config.js";

const Signup = () => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await account.create(ID.unique(), email, password);
      toast.success("Account created successfully! Please verify your email.");
      await account.createEmailPasswordSession(email, password);
      await account.createVerification("http://localhost:5173/verify");
    } catch (error) {
      console.log(error);
    }

    // navigate to the dashboard
    <Navigate to="/dashboard" />;
  };

  return (
    <div className="hero bg-base-200 min-h-[85vh]">
      <div className="hero-content min-w-[90%] flex flex-col">
        <div className="text-center min-w-[80%] lg:text-left">
          <h1 className="text-5xl text-center font-bold">Sign up here </h1>
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

export default Signup;
