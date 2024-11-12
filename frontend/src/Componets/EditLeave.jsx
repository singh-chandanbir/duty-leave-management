import { useContext, useState } from "react";
import { BackendURL } from "../Constants";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const EditLeave = (leave) => {
  const [status, setStatus] = useState(leave.leave.status);
  const { token } = useContext(AuthContext);
  const handelSubmit = async () => {
    const response = await fetch(BackendURL + "/approve-leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ leaveId: leave.leave._id, status: status }),
    });

    const jsonRes = await response.json();

    if (jsonRes.success === false) {
      toast.error(jsonRes.message);
    } else {
      toast.success("Leave Updated Successfully");
      document.getElementById("closeBTN").click();
    }
  };

  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        Update Status
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex flex-col gap-4">
            <label className="input input-bordered flex items-center gap-2">
              Student Name
              <input
                type="text"
                placeholder={leave.leave.name}
                className="input input-bordered w-full max-w-xs"
                disabled
              />{" "}
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Event Name
              <input
                type="text"
                placeholder={leave.leave.eventName}
                className="input input-bordered w-full max-w-xs"
                disabled
              />
            </label>
            <div className="flex w-full justify-between ">
              <label className="input input-bordered flex items-center gap-2">
                Start Date
                <input
                  type="text"
                  placeholder={leave.leave.startDate}
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                End Date
                <input
                  type="text"
                  placeholder={leave.leave.endDate}
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
              </label>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              Status
              <select
                onChange={(e) => setStatus(e.target.value)}
                className="select select-bordered w-full max-w-xs"
              >
                <option>Pending</option>
                <option>Approve</option>
              </select>
            </label>
          </div>
          <div className="modal-action">
            <div onClick={handelSubmit} className="btn btn-error">
              Submit
            </div>

            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button id="closeBTN" className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditLeave;
