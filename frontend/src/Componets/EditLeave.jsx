import { toast } from "react-toastify";
import { collectionId, databaceId, database } from "../Appwrite/config";
import { useState } from "react";
import PropTypes from "prop-types";

const EditLeave = ({ leave }) => {
  console.log("leave");
  console.log(leave);
  const [status, setStatus] = useState(leave.status);
  const handelSubmit = async () => {
    try {
      console.log("leave.$id", leave.$id);
      console.log("leave.eventName", leave.eventName);
      const result = await database.updateDocument(
        databaceId,
        collectionId,
        leave.$id,
        { status: status },
      );
      console.log(result.eventName);
      toast.success("Status Updated Successfully");
      document.getElementById("closeBTN").click();
      const res = fetch(import.meta.env.VITE_APP_EMAIL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Leave ${status}ed with id ${leave.$id}  ${leave.eventName} from ${leave.startDate} to ${leave.endDate} is ${status}. Please check the dashboard for more details`,
          receiverEmail: leave.userId,
        }),
      });
      console.log("res", res);

      console.log("result", result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="btn"
        onClick={() =>
          document.getElementById(`my_modal_4${leave.$id}`).showModal()
        }
      >
        Update Status
      </button>
      <dialog id={`my_modal_4${leave.$id}`} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex flex-col gap-4">
            <label className="input input-bordered flex items-center gap-2">
              Student Name
              <input
                type="text"
                placeholder={leave.name}
                className="input input-bordered w-full max-w-xs"
                disabled
              />{" "}
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Event Name
              <input
                type="text"
                placeholder={leave.eventName}
                className="input input-bordered w-full max-w-xs"
                disabled
              />
            </label>
            <div className="flex w-full justify-between ">
              <label className="input input-bordered flex items-center gap-2">
                Start Date
                <input
                  type="text"
                  placeholder={leave.startDate}
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                End Date
                <input
                  type="text"
                  placeholder={leave.endDate}
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
EditLeave.propTypes = {
  leave: PropTypes.shape({
    $id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    eventName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditLeave;
