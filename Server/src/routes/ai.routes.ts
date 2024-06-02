import { Router } from "express";
import { text2imageConvert } from "../controllers/text2image.controller";
import { upload } from "../middlewares/multer.middleware";
import { image2imageConvert } from "../controllers/image2image.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/text-image").post(verifyJWT, text2imageConvert);
router.route("/image-modification").post(verifyJWT, upload.single("testImage"), image2imageConvert);

export default router;
