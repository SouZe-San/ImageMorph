import { Request } from "express";

import multer, { diskStorage } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = diskStorage({
  destination: function (req: Request, file: Express.Multer.File, callback: DestinationCallback) {
    callback(null, "./public/temp/image"); // Save the
  },
  filename: function (req: Request, file: Express.Multer.File, callback: FileNameCallback) {
    callback(null, file.originalname);
  },
});

export const upload = multer({ storage });
