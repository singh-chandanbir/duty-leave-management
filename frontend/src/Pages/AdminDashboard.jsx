import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Loader from "../Componets/Loader";
import { BackendURL } from "../Constants";
import EditLeave from "../Componets/EditLeave";

const AdminDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(BackendURL + "/get-all-leaves", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonRes = await res.json();
      setData(jsonRes.leaves);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (user.type === "Student") {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div>
      {data ? (
        data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Student Name</th>
                  <th>Student RollNumber</th>
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
                    <td>{leave.name}</td>
                    <td>{leave.rollNumber}</td>
                    <td>{leave.eventName}</td>
                    <td>{leave.status}</td>
                    <td>{leave.startDate}</td>
                    <td>{leave.endDate}</td>
                    <td>
                      <a href={leave.certificate}>link</a>
                    </td>
                    <td>
                      <EditLeave leave={leave} />
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
  );
};

export default AdminDashboard;
