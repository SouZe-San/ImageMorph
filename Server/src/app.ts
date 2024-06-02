import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRoutes from "./routes/user.routes";
import aiRouter from "./routes/ai.routes";
//routes declaration
// app.use("/image-morph/api/v1/", (_req, res) => {
//     res.send("Welcome to Image Morph API v1 🚀");
//     }
// );
app.use("/image-morph/api/v1/user", userRoutes);
app.use("/image-morph/api/v1/image", aiRouter);

export { app };
