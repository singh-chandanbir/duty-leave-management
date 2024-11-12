import { useContext, useState } from "react";
import { BackendURL } from "../Constants";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

const AddLeaveModel = () => {
  const { token } = useContext(AuthContext);
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [file, setFile] = useState("");
  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("file", file);

    const response = await fetch(BackendURL + "/request-leave", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const jsonRes = await response.json();

    if (jsonRes.success === false) {
      toast.error(jsonRes.message);
    } else {
      toast.success("Leave Requested Successfully");
      document.getElementById("closeBTN").click();
    }
  };

  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        Request Leave
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box  w-11/12 max-w-5xl">
          {/* form */}
          <div className="flex flex-col gap-4">
            <label className="input input-bordered flex items-center gap-2">
              Event Name
              <input
                onChange={(e) => setEventName(e.target.value)}
                type="text"
                className="grow"
                placeholder=""
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Start Date
              <input
                onChange={(e) => setStartDate(e.target.value)}
                type="text"
                className="grow"
                placeholder="DD/MM/YYYY"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              End Date
              <input
                onChange={(e) => setEndDate(e.target.value)}
                type="text"
                className="grow"
                placeholder="DD/MM/YYYY"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Certificate or Document Proof
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                className="file-input w-full max-w-xs"
              />
            </label>
          </div>

          <div className="modal-action">
            <div onClick={handelSubmit} className="btn btn-error">
              Submit
            </div>

            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button id="closeBTN" className="btn">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddLeaveModel;
