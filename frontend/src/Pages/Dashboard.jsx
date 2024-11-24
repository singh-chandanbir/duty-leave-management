import { useContext, useEffect, useState } from "react";
import Loader from "../Componets/Loader";
import AddLeaveModel from "../Componets/AddLeaveModel";
import { collectionId, databaceId, database, Query } from "../Appwrite/config";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const leave = await database.listDocuments(databaceId, collectionId, [
        Query.equal("userId", user.$id),
      ]);
      setData(leave.documents);
      console.log(leave);
    };
    fetchData();
  }, []);
  if (user.labels[0] === "admin") {
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
                    <th>Doc</th>
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
