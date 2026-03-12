import FormData from "form-data";
import fetch from "node-fetch";
import fs from "node:fs";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { resStatus } from "../utils/responseStatus";
import { createReadStream } from "fs";
import { getDataFolderPath, persistData } from "../utils/file.utils";
import { isString } from "../utils/image.utils";
import {
  ASSETS_FOLDER_FOR_IMG_GENERATION,
  STABILITY_ENGINE_ID,
} from "../constant";
import { NImages } from "./types";

const engineId = STABILITY_ENGINE_ID;
const ASSETS_FOLDER_NAME = ASSETS_FOLDER_FOR_IMG_GENERATION;

const text2imageConvert = async (req: Request, res: Response) => {
  const apiHost = process.env.STABILITY_API_HOST;
  const apiKey = process.env.STABILITY_API_KEY;

  const { prompt, ratio, stylePreset, negativePrompt } = req.body;
  if (!isString(prompt)) {
    throw new ApiError(resStatus.InvalidInput, "Prompt must be a string");
  }

  try {
    if (!apiKey)
      throw new ApiError(resStatus.BadGateway, "Missing Stability API key.");

    // Optional Parameters
    const style_preset = stylePreset || "enhance";
    console.log("style_preset : ", style_preset);

    // Creating request body
    const formData = new FormData();
    formData.append("prompt", prompt);
    if (negativePrompt) {
      formData.append("negative_prompt", negativePrompt);
    }
    if (ratio) {
      formData.append("aspect_ratio", ratio);
    }
    formData.append("style_preset", style_preset);
    const response = await fetch(`${apiHost}/generate/core`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    const responseJSON = (await response.json()) as NImages.GenerationResponse;

    const filePath = `${getDataFolderPath(ASSETS_FOLDER_NAME)}/${Date.now()}.png`;

    persistData(Buffer.from(responseJSON.image, "base64"), filePath);
    console.log(`Image generated successfully at ${filePath}`);

    const responsePath = `temp/${ASSETS_FOLDER_NAME}${filePath.split(ASSETS_FOLDER_NAME)[1]}`;
    res.status(resStatus.Created).json(
      new ApiResponse(resStatus.Success, "Image Generation Successful", {
        link: responsePath,
      }),
    );
  } catch (error) {
    console.log("error from text-2-image convert : ", error);
    if (error instanceof ApiError) {
      const { statusCode, message } = error;
      return res.status(statusCode).json({ error: message });
    }
    res
      .status(resStatus.InternalServerError)
      .json({ error: "Something went Wrong in Server" });
  }
};

export { text2imageConvert };
