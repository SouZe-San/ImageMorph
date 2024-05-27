import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { User } from "../models/user.model";
import { Request,Response } from "express";
import { Types } from "mongoose";
import { resStatus } from "../utils/responseStatus";
import { NUsers } from "./types";
import { validationCheck, regexErrorMassage } from "../utils/regEX.utils";
import jwt from "jsonwebtoken";

//  Security for cookies
const cookieOption : NUsers.ICookieOption = {
   httpOnly: true,
  secure: false, // Set to true if using HTTPS
  sameSite: "strict", // or 'None' if you need to handle cross-origin
  domain: "localhost",
  path: "/",
}

/*
!  * Generate access token for user
  * @param {Types.ObjectId} userId
  * @returns {Promise<{accessToken: string}>}
  * @throws {ApiError}
*/  
const generateAccessAndRefreshTokens = async (userId:Types.ObjectId) => {
  try {

    // find the user by id
    const user = await User.findById(userId);

    // if user does not exist throw an error
    if (!user) {
      throw new ApiError(resStatus.Forbidden, "User does not exist");
    }   

    // generate the access token
    const accessToken = user.generateAccessToken();
    // generate the refresh token
    const refreshToken = user.generateRefreshToken();

    // Save the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken,refreshToken};
  } catch (error) {
    console.log("error from generateAccess: ", error);
    throw new ApiError(resStatus.InternalServerError, "Something went wrong while generating access token");
  }
};

/*
! * Register a new user
  * @param {Request} req - { email: string, username: string, password: string, fullName: string}
  * @param {Response} res
  * @returns {Promise<void>}
  * @throws {ApiError}
*/

const userRegister = async (req:Request, res:Response) => {

  try {

    // collect the data from the request body
    const { email, username, password}:NUsers.IRegisterUser = req.body;

    // check if any of the required fields are empty
    if ([username, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(resStatus.InvalidInput, "All fields are required , Some of them are empty");
    }

    // Regex validation for the fields
    if (!validationCheck(username,"username")) {
      throw new ApiError(resStatus.InvalidInput, regexErrorMassage.username);
    }
    if (!validationCheck(password, "password")) {
      throw new ApiError(resStatus.InvalidInput, regexErrorMassage.password);
    }
    if (!validationCheck(email, "email")) {
      throw new ApiError(resStatus.InvalidInput, regexErrorMassage.email);
    }
    

    // check if the user already exists
    const existedUser = await User.findOne({
      email,
    });

    if (existedUser) {
      return res
        .status(resStatus.Conflict)
        .json(new ApiResponse(resStatus.Conflict, "User, You already exist !! Why again ?", existedUser));
    }

    // create a new user
    const user = await User.create({
      username,
      email,
      password,
    });

    // check if the user is created successfully
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    // if not created throw an error
    if (!createdUser) {
      throw new ApiError(resStatus.InternalServerError, "Something went wrong while registering the user");
    }


    // Ultimately send the response as success
    res
      .status(resStatus.Created)
      .json(new ApiResponse(resStatus.Success, "User registered Successfully", { data: "All Green !!" }));
  } catch (error) {

    // if any error occurs send the error response
    console.log("error from register: ", error);
    if (error instanceof ApiError) {
      const { statusCode, message } = error;
      return res.status(statusCode).json({ error: message });
    }
    res.status(resStatus.InternalServerError).json({ error: "Something went Wrong in Server" });
  }
};


/*
!  * Log In a user
  * @param {Request} req - { email: string, username: string, password: string}
  * @param {Response} res
  * @returns {Promise<Response>}
  * @throws {ApiError}
*/
const userLogIn = async (req:Request, res:Response) => {
  try {

    // collect the data from the request body
    const { email, password }:NUsers.ILoginUser = req.body;


    // check if any of the required fields are empty
    if ([ email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(resStatus.InvalidInput, "All fields are required , Some of them are empty");
    }

    // Regex validation for the fields
       if (!validationCheck(password, "password")) {
      throw new ApiError(resStatus.InvalidInput, regexErrorMassage.password);
    }
    if (!validationCheck(email, "email")) {
      throw new ApiError(resStatus.InvalidInput, regexErrorMassage.email);
    }

    
    // check if the user exists
    const user = await User.findOne({
      email,
    });

    // if user does not exist throw an error
    if (!user) {
      throw new ApiError(resStatus.NotFound, "User does not exist");
    }

    // check if the password is correct
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(resStatus.Unauthorized, "Invalid user credentials");
    }

    // generate the access token
 const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");


    // send the response
    res
      .status(resStatus.Success)
     .cookie("accessToken", accessToken, cookieOption)
      .cookie("refreshToken", refreshToken, cookieOption)
      .json(new ApiResponse(resStatus.Success, "User Logged In successfully", {  loggedInUser,
          accessToken,
          refreshToken,}));


  } catch (error) {
    console.log("error from Sign in : ", error);
    if (error instanceof ApiError) {
      const { statusCode, message } = error;
      return res.status(statusCode).json({ error: message });
    }
    res.status(resStatus.InternalServerError).json({ error: "Something went Wrong in Server" });
  }
};


/*
!  * Log Out a user
  * @description  this function will activate after passing the middleware , then it search the user in db and then delete the refresh token
  * @param {Request} 
  * @param {Response} res
  * @returns {Promise<Response>}
  * @throws {ApiError}
*/
const logoutUser = async (req:NUsers.RequestWithUser, res:Response) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1, // this removes the field from document
        },
      },
      {
        new: true,
      }
    );

    return res
      .status(resStatus.Success)
      .clearCookie("accessToken", cookieOption)
      .clearCookie("refreshToken", cookieOption)
      .json(new ApiResponse(resStatus.Success, "User logged Out", {}));
  } catch (error) {
    console.log("error from Log Out : ", error);
    res.status(resStatus.InternalServerError).json({ error: "Something went Wrong in Server" });
  }
};

/*
!  * Refresh Access Token 
  * @description  Get new access token using refresh token
  * @param {Request} req - { email: string, username: string, password: string}
  * @param {Response} res
  * @returns {Promise<Response>}
  * @throws {ApiError}
*/
const refreshAccessToken = async (req:Request, res:Response) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(resStatus.Unauthorized, "unauthorized request");
    }

    try {
      if(!process.env.REFRESH_TOKEN_SECRET){
        throw new ApiError(resStatus.Unauthorized, "REFRESH_TOKEN_SECRET Could not find");
      }
      const decodedToken  = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

       if (typeof decodedToken === 'string') {
        throw new ApiError(resStatus.Unauthorized, "Jwt payload come as String | instead of JWT payload");
       }
      const user = await User.findById(decodedToken?._id);

      if (!user) {
        throw new ApiError(resStatus.Unauthorized, "Invalid refresh token");
      }

      if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(resStatus.Unauthorized, "Refresh token is expired or used");
      }

      const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
      const newRefreshToken = refreshToken

      return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOption)
        .cookie("refreshToken", newRefreshToken, cookieOption)
        .json(
          new ApiResponse(
            200,
            "Access token refreshed",
            { accessToken, refreshToken: newRefreshToken }
          )
        );
    } catch (error) {
      throw new ApiError(resStatus.Forbidden, "Invalid refresh token");
    }
  } catch (error) {
    console.log("error from refreshAccess Token creating time : ", error);
    res.status(resStatus.InternalServerError).json({ error: "Something went Wrong in Server" });
  }
};


/*
!  * getCurrentUser
 * @description  After verify the user in middleware, 
  * @param {Request} req - { email: string, username: string, password: string}
  * @param {Response} res
  * @returns {Promise<void>}
  * @throws {ApiError}
*/

const getCurrentUser = async (req:NUsers.RequestWithUser, res:Response) => {
  try {
    return res.status(resStatus.Success).json(new ApiResponse(200, req.user, "User fetched successfully"));
  } catch (error) {
    console.log("error from get User Info : ", error);
    res.status(resStatus.InternalServerError).json({ error: "Something went Wrong in Server" });
  }
};

export { userRegister, userLogIn,logoutUser ,getCurrentUser,refreshAccessToken};
