import { useEffect, useState } from "react";
import { account } from "../Appwrite/config";
import { Navigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      const userId = searchParams.get("userId");
      const secret = searchParams.get("secret");
      try {
        await account.updateVerification(userId, secret);
        toast("Email verified successfully");
        return <Navigate to="/login" />;
      } catch (error) {
        console.error(error);
        setMessage("Verification failed. Please try again.");
      }
    };

    verifyUser();
  }, [searchParams]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
