import mongoose, { Schema, Types } from "mongoose";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


interface jwtPayload{
    _id: Types.ObjectId;
    email: string;
    username: string;

}
interface UserModel{
    username: string;
    fullName: string;
    email: string;
    password: string;
    generateAccessToken(): string;
    isPasswordCorrect(password:string):  Promise<boolean>;

}



const userSchema = new Schema<UserModel>({
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


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password:string) : Promise<boolean>{
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {

  const payload:jwtPayload = {
    _id: this._id,
    email: this.email,
    username: this.username,
  }


    if(process.env.ACCESS_TOKEN_SECRET){

    const JwtSecret:string = process.env.ACCESS_TOKEN_SECRET
 
    return jwt.sign(
    payload,
     JwtSecret,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );   
}
};


export const User = mongoose.model<UserModel>("User", userSchema)