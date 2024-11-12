import { Router } from "express";

import multer from "multer";
const upload = multer({ dest: "uploads/" });
import {
  login,
  register,
  requestLeave,
  getLeaves,
  approveLeave,
  getAllLeves,
} from "../controllers/user.controller.js";
import verifyUserJWT from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.route("/login").post(login); // tested ok
userRouter.route("/register").post(register); // tested ok
userRouter
  .route("/request-leave")
  .post(verifyUserJWT, upload.single("file"), requestLeave);
userRouter.route("/leaves").get(verifyUserJWT, getLeaves);
userRouter.route("/approve-leave").post(verifyUserJWT, approveLeave);
userRouter.route("/get-all-leaves").get(verifyUserJWT, getAllLeves);

export default userRouter;
