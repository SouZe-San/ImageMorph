import mongoose, { Schema, Types } from "mongoose";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { NUser_model } from "./types";

const userSchema = new Schema<NUser_model.IUserModel>({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    index: true,
  },
  password: { type: String, required: [true, "Password is required"] },
});


/*
  * 1. Pre-save hook to hash the password before saving it to the database
  * 2. isPasswordCorrect method to compare the password with the hashed password
  * 3. generateAccessToken method to generate a JWT token for the user
  */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const payload: NUser_model.IJwtPayload = {
    _id: this._id,
    email: this.email,
    username: this.username,
  };

  if (process.env.ACCESS_TOKEN_SECRET) {
    const JwtSecret: string = process.env.ACCESS_TOKEN_SECRET;

    return jwt.sign(payload, JwtSecret, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
  }
};

export const User = mongoose.model<NUser_model.IUserModel>("User", userSchema);
