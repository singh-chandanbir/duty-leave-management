import { useContext, useState } from "react";
import { toast } from "react-toastify";
import {
  storage,
  ID,
  bucketId,
  database,
  databaceId,
  collectionId,
} from "../Appwrite/config";
import { AuthContext } from "../Context/AuthContext";
import { rollNumber } from "../Utils/rollnumber";

const AddLeaveModel = () => {
  const { user } = useContext(AuthContext);
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await storage.createFile(bucketId, ID.unique(), file);
      await setFileUrl(response["$id"]);

      const roll = await rollNumber(user.email);
      console.log(roll);

      const leave = await database.createDocument(
        databaceId,
        collectionId,
        ID.unique(),
        {
          eventName: eventName,
          startDate: startDate,
          endDate: endDate,
          name: user.name,
          rollNumber: roll,
          certificate: fileUrl,
          userId: user.email,
        },
      );

      console.log(leave);
      toast.success("Leave Requested Successfully");

      document.getElementById("closeBTN").click();
      console.log(import.meta.env.VITE_APP_EMAIL_URL);
      const res = await fetch(import.meta.env.VITE_APP_EMAIL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Leave Requested with id ${leave.$id}  ${eventName} from ${startDate} to ${endDate} is pending for approval. Please check the dashboard for more details`,
          receiverEmail: user.email,
        }),
      });
      const data = await res.json();

      console.log(data);
    } catch (error) {
      toast.error("Failed to Request Leave, All fields are required");
      console.error(error);
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
