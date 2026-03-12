import { Router } from "express";
import { text2imageConvert } from "../controllers/text2image.controller";
import { upload } from "../middlewares/multer.middleware";
import { image2imageConvert } from "../controllers/image2image.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { sketch2imageConvert } from "../controllers/sketch2image.controller";

const router = Router();

router.route("/text-image").post(verifyJWT, text2imageConvert);
router
  .route("/image-modification")
  .post(verifyJWT, upload.single("testImage"), image2imageConvert);
router
  .route("/sketch-2-image")
  .post(verifyJWT, upload.single("testImage"), sketch2imageConvert);

export default router;
