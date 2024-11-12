import mongoose from "mongoose";
import { DB_NAME } from "../Constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );
    // console.log(connectionInstance);
  } catch (error) {
    console.log("MongoDB Connection ERR", error);
    process.exit(1);
  }
};

export { connectDB };
