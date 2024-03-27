import { Router } from "express";
import { GetUserById, loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router();
router.route("/userregister").post(registerUser);
router.route("/userlogin").post(loginUser)
router.route("/getuserbyid/:id").get(GetUserById);

export default router;
