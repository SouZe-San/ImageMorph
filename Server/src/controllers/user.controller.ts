import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { User } from "../models/user.model";
import { Request,Response } from "express";
import { Types } from "mongoose";
import { resStatus } from "../utils/responseStatus";
import { NUsers } from "./types";
import { validationCheck, regexErrorMassage } from "../utils/regEX.utils";

/*
  * Generate access token for user
  * @param {Types.ObjectId} userId
  * @returns {Promise<{accessToken: string}>}
  * @throws {ApiError}
*/  
//! Generate access token for user
const generateAccess = async (userId:Types.ObjectId) => {
  try {

    // find the user by id
    const user = await User.findById(userId);

    // if user does not exist throw an error
    if (!user) {
      throw new ApiError(resStatus.Forbidden, "User does not exist");
    }   

    // generate the access token
    const accessToken = user.generateAccessToken();
    return { accessToken };
  } catch (error) {
    console.log("error from generateAccess: ", error);
    throw new ApiError(resStatus.InternalServerError, "Something went wrong while generating access token");
  }
};

/*
  * Register a new user -
  * @param {Request} req - { email: string, username: string, password: string, fullName: string}
  * @param {Response} res
  * @returns {Promise<void>}
  * @throws {ApiError}
*/

//! Register a new user
const userRegister = async (req:Request, res:Response) => {

  try {

    // collect the data from the request body
    const { email, username, password, fullName}:NUsers.IRegisterUser = req.body;

    // check if any of the required fields are empty
    if ([username, email, fullName, password].some((field) => field?.trim() === "")) {
      throw new ApiError(resStatus.InvalidInput, "All fields are required , Some of them are empty");
    }

    // Regex validation for the fields
    if (!validationCheck(username,"username")) {
      throw new ApiError(resStatus.InvalidInput, regexErrorMassage.username);
    }
    if (!validationCheck(fullName, "fullName")) {
      throw new ApiError(resStatus.InvalidInput, regexErrorMassage.fullName);
    }
    if (!validationCheck(password, "password")) {
      throw new ApiError(resStatus.InvalidInput, regexErrorMassage.password);
    }
    if (!validationCheck(email, "email")) {
      throw new ApiError(resStatus.InvalidInput, regexErrorMassage.email);
    }
    

    // check if the user already exists
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
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
      fullName,
      password,
    });

    // check if the user is created successfully
    const createdUser = await User.findById(user._id).select("-password");

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
  * Sign In a user
  * @param {Request} req - { email: string, username: string, password: string}
  * @param {Response} res
  * @returns {Promise<void>}
  * @throws {ApiError}
*/
//! Sign In a user
const userLogIn = async (req:Request, res:Response) => {
  try {

    // collect the data from the request body
    const { username, email, password }:NUsers.ILoginUser = req.body;


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

    
    // check if the user exists
    const user = await User.findOne({
      $and: [{ username }, { email }],
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
    const { accessToken } = await generateAccess(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");


    // security for cookies
    const options = {
      httpOnly: true,
      secure: true,
    };

    // send the response
    res
      .status(resStatus.Success)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(resStatus.Success, "User Logged In successfully", { loggedInUser, accessToken }));


  } catch (error) {
    console.log("error from Sign in : ", error);
    if (error instanceof ApiError) {
      const { statusCode, message } = error;
      return res.status(statusCode).json({ error: message });
    }
    res.status(resStatus.InternalServerError).json({ error: "Something went Wrong in Server" });
  }
};

export { userRegister, userLogIn };
