import { toast } from "react-toastify";
import { collectionId, databaceId, database } from "../Appwrite/config";
import { useState } from "react";

const EditLeave = (leave) => {
  const [status, setStatus] = useState(leave.leave.status);
  const handelSubmit = async () => {
    try {
      console.log(leave.leave.$id);
      const result = await database.updateDocument(
        databaceId,
        collectionId,
        leave.leave.$id,
        { status: status },
      );
      toast.success("Status Updated Successfully");
      document.getElementById("closeBTN").click();

      const res = fetch(import.meta.env.VITE_APP_EMAIL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Leave ${status}ed with id ${leave.leave.$id}  ${leave.leave.eventName} from ${leave.leave.startDate} to ${leave.leave.endDate} is ${status}. Please check the dashboard for more details`,
          receiverEmail: leave.leave.email,
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
