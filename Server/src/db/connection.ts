import {connect} from "mongoose";
import { DB_NAME } from "../constant";

const connectDB = async () => {
  try {
    const connectionInstance = await connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection Error ", error);
    process.exit(1);
  }
};

export default connectDB;
