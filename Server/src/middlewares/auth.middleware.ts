import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { Response, Request, NextFunction } from "express";
import { resStatus } from "../utils/responseStatus";
import jwt from "jsonwebtoken";
import { NUser_model } from "../models/types";
import { log } from "node:console";

interface RequestWithUser extends Request {
  user?: NUser_model.IReqUser;
}

export const verifyJWT = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(resStatus.Unauthorized, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (typeof decodedToken !== "string") {
      const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

      if (!user) {
        throw new ApiError(resStatus.Unauthorized, "Invalid Access Token");
      }
      req.user = user;
    }
    next();
  } catch (error) {
    console.log("error from authMiddleware: ", error);
    res.status(resStatus.Forbidden).json({ error: "Invalid token" });
  }
};
