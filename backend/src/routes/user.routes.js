import {Router} from "express";
import { registerUser, loginUser, updateUserProfile } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// router.post("/register", registerUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/update-profile").put(verifyJWT, updateUserProfile);

export default router;