import { Router } from "express";
import { text2imageConvert } from "../controllers/text2image.controller";
import { upload } from "../middlewares/multer.middleware";
import { image2imageConvert } from "../controllers/image2image.controller";

const router = Router();

router.route("/text-image").post(text2imageConvert);
router.route("/image-modification").post(upload.single("testImage"), image2imageConvert);

export default router;
