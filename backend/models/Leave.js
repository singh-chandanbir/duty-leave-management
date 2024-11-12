import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    rollNumber: { type: String, required: true },
    status: { type: String, default: "Pending" },
    certificate: { type: String, default: false },
  },
  { timestamps: true },
);

export const Leave = mongoose.model("Leave", LeaveSchema);
