// import fetch from "node-fetch";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { resStatus } from "../utils/responseStatus";
import { createReadStream } from "fs";
import { getDataFolderPath, persistData } from "../utils/file.utils";
import { generateDimensions, isString } from "../utils/image.utils";
import { ASSETS_FOLDER_FOR_IMG_GENERATION, STABILITY_ENGINE_ID } from "../constant";
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
  const userPrompts: NImages.IPrompt[] = [
    {
      text: prompt,
      weight: 1,
    },
  ];

  try {
    if (!apiKey) throw new ApiError(resStatus.BadGateway, "Missing Stability API key.");

    const dimensions = generateDimensions(ratio) || { width: 512, height: 512 };

    if (negativePrompt) {
      userPrompts.push({
        text: negativePrompt,
        weight: -1,
      });
    }

    const style_preset = stylePreset || "enhance";
    const response = await fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: userPrompts,
        cfg_scale: 7,
        height: dimensions.height,
        width: dimensions.width,
        steps: 50,
        samples: 1,
        style_preset,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new ApiError(resStatus.NotFound, text);
    }

    const responseJSON = (await response.json()) as NImages.GenerationResponse;

    const filePath = `${getDataFolderPath(ASSETS_FOLDER_NAME)}/${Date.now()}.png`;

    persistData(Buffer.from(responseJSON.artifacts[0].base64, "base64"), filePath);
    console.log(`Image generated successfully at ${filePath}`);
    // const file = createReadStream(filePath);

    // file.pipe(res);
    const responsePath = `temp/${ASSETS_FOLDER_NAME}${filePath.split(ASSETS_FOLDER_NAME)[1]}`;
    res
      .status(resStatus.Created)
      .json(
        new ApiResponse(resStatus.Success, "Image Generation Successful", { link: responsePath })
      );
  } catch (error) {
    console.log("error from text-2-image convert : ", error);
    if (error instanceof ApiError) {
      const { statusCode, message } = error;
      return res.status(statusCode).json({ error: message });
    }
    res.status(resStatus.InternalServerError).json({ error: "Something went Wrong in Server" });
  }
};

export { text2imageConvert };
