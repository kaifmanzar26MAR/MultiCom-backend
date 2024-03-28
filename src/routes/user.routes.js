import { Router } from "express";
import { GetUserById, getCurrentUser, loginUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/userregister").post(registerUser);
router.route("/userlogin").post(loginUser)
router.route("/getuserbyid/:id").get(GetUserById);
router.route("/current-user").get(verifyJWT, getCurrentUser);

export default router;
