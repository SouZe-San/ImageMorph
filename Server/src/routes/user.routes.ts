import { Router } from "express";
import {
  userRegister,
  userLogIn,
  logoutUser,
  getCurrentUser,
  refreshAccessToken,
} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/signup").post(userRegister);
router.route("/login").post(userLogIn);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-user").get(verifyJWT, getCurrentUser);
export default router;
