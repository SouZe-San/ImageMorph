import FormData from "form-data";
import fetch from "node-fetch";
import fs from "node:fs";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { resStatus } from "../utils/responseStatus";
import { getDataFolderPath, persistData, scheduleFileDeletion } from "../utils/file.utils";
import { isString } from "../utils/image.utils";
import { NImages } from "./types";
import { ASSETS_FOLDER_FOR_SKETCH_GENERATION, STABILITY_ENGINE_ID } from "../constant";

const image2imageConvert = async (req: Request, res: Response) => {
  const apiHost = process.env.STABILITY_API_HOST;
  const apiKey = process.env.STABILITY_API_KEY;
  const engineId = STABILITY_ENGINE_ID;
  try {
    if (!apiKey) throw new ApiError(resStatus.BadGateway, "Missing Stability API key.");

    // take details from request
    const { prompt, stylePreset, negativePrompt } = req.body;

    if ([prompt].some((field) => field?.trim() === "")) {
      throw new ApiError(
        resStatus.InvalidInput,
        "prompt & ratio must Present , Some of them are empty"
      );
    }

    if (!isString(prompt)) {
      throw new ApiError(resStatus.InvalidInput, "Prompt must be a string");
    }

    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
      throw new ApiError(resStatus.NotFound, "Image file is missing");
    }

    // Optional Parameters
    const style_preset = stylePreset || "enhance";
    console.log("style_preset : ", imageLocalPath);

    // Creating request body
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imageLocalPath));
    formData.append("control_strength", "0.65");
    formData.append("prompt", prompt);
    if (negativePrompt) {
      formData.append("negative_prompt", negativePrompt);
    }
    formData.append("cfg_scale", "7");
    formData.append("samples", "1");
    formData.append("steps", "30");
    formData.append("style_preset", style_preset);

    const response = await fetch(`${apiHost}/v2beta/stable-image/control/sketch`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new ApiError(resStatus.NotFound, text);
    }
    const responseJSON = (await response.json()) as NImages.GenerationResponse;

    // responseJSON.artifacts.forEach((image, index) => {
    //   fs.writeFileSync(`out/v1_img2img_${index}.png`, Buffer.from(image.base64, "base64"));
    // });

    const filePath = `${getDataFolderPath(ASSETS_FOLDER_FOR_SKETCH_GENERATION)}/${Date.now()}.png`;

    persistData(Buffer.from(responseJSON.artifacts[0].base64, "base64"), filePath);

    const responsePath = `temp/${ASSETS_FOLDER_FOR_SKETCH_GENERATION}${
      filePath.split(ASSETS_FOLDER_FOR_SKETCH_GENERATION)[1]
    }`;
    console.log(`Image generated successfully at ${filePath}`);

    scheduleFileDeletion(filePath);

    res
      .status(resStatus.Created)
      .json(new ApiResponse(resStatus.Success, "SketchImage", { link: responsePath }));
  } catch (error) {
    console.log("error from Sketch TO image convert : ", error);
    if (error instanceof ApiError) {
      const { statusCode, message } = error;
      return res.status(statusCode).json({ error: message });
    }
    res.status(resStatus.InternalServerError).json({ error: "Something went Wrong in Server" });
  } finally {
    if (req.file?.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting temporary file:", err);
      });
    }
  }
};

export { image2imageConvert };
