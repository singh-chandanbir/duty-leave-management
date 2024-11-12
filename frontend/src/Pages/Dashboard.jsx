import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "../Componets/Loader";
import { BackendURL } from "../Constants";
import AddLeaveModel from "../Componets/AddLeaveModel";

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(BackendURL + "/leaves", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonRes = await res.json();
      setData(jsonRes.leaves);
    };
    fetchData();
  }, []);
  if (user.type === "Faculty") {
    return <Navigate to="/admin-dashboard" />;
  }

  return (
    <div className="flex flex-col justify-start items-center min-h-[85vh]">
      <div className="flex items-center justify-around w-full">
        <div>Manage Your Leave Requests</div>
        <AddLeaveModel />
      </div>
      <div>
        {data ? (
          data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Event Name</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {data.map((leave, index) => (
                    <tr key={leave._id}>
                      <th>{index + 1}</th>
                      <td>{leave.eventName}</td>
                      <td>{leave.status}</td>
                      <td>{leave.startDate}</td>
                      <td>{leave.endDate}</td>
                      <td>
                        <a href={leave.certificate}>link</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h1>No data</h1>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
