import express from "express";
import cors from "cors";

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  // credential: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(express.static("Public"));

// Router imports
import userRouter from "./routes/user.routes.js";

// Routes declaration
app.use("/api", userRouter); 

export { app };
