import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Loader from "../Componets/Loader";
import EditLeave from "../Componets/EditLeave";
import { collectionId, databaceId, database } from "../Appwrite/config";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const leave = await database.listDocuments(databaceId, collectionId, []);
      setData(leave.documents);
      console.log(leave);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // TODO : remove this after testing
  if (user.labels[0] !== "admin") {
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
                  <tr key={leave.$id}>
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
