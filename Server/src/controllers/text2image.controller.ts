// import fetch from "node-fetch";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { resStatus } from "../utils/responseStatus";
import { createReadStream } from 'fs';
import { getDataFolderPath,persistData } from "../utils/file.utils";
interface GenerationResponse {
    artifacts: Array<{
        base64: string;
        seed: number;
        finishReason: string;
    }>;
}

const engineId = "stable-diffusion-v1-6";


const text2imageConvert = async (req: Request, res: Response) => {
    const apiHost = process.env.STABILITY_API_HOST ;
    const apiKey = process.env.STABILITY_API_KEY;

    const { prompt } = req.body;
    try {
        if (!apiKey) throw new ApiError(resStatus.BadGateway, "Missing Stability API key.");

        const response = await fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                text_prompts: [
                    {
                        text:prompt,
                    },
                ],
                cfg_scale: 7,
                height: 512,
                width: 512,
                steps: 50,
                samples: 1,
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new ApiError(resStatus.NotFound, text);
        }

        const responseJSON = (await response.json()) as GenerationResponse;

        
        const filePath = `${getDataFolderPath()}/${Date.now()}.png`
        
            persistData(Buffer.from(responseJSON.artifacts[0].base64, "base64"),filePath)
            console.log(`Image generated successfully at ${filePath}`);
         const file = createReadStream(filePath)
         file.pipe(res)
    } catch (error) {
        console.log("error from Sign in : ", error);
        if (error instanceof ApiError) {
            const { statusCode, message } = error;
            return res.status(statusCode).json({ error: message });
        }
        res.status(resStatus.InternalServerError).json({ error: "Something went Wrong in Server" });
    }
};

export { text2imageConvert };