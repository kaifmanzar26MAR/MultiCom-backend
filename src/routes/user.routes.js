import { Router } from "express";
import { GetUserById, registerUser } from "../controllers/user.controller.js";

const router = Router();
router.route("/userregister").post(registerUser);
router.route("/getuserbyid/:id").get(GetUserById);

export default router;
