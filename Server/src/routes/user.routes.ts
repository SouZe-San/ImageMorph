import { Router } from "express";
import { userRegister,userLogIn } from "../controllers/user.controller";

const router = Router();

router.route("/signup").post(userRegister);
router.route("/login").post(userLogIn);

export default router;
