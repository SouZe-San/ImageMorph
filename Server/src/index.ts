import dotenv from "dotenv";
import { app } from "./app";
import connectDB from "./db/connection";

dotenv.config();
// Start The Express Server

const PORT: string | number = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
