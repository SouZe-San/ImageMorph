import { Router } from "express";
import { text2imageConvert } from "../controllers/text2image.controller";


const router = Router();

router.route("/text-image").post(text2imageConvert);

export default router;
