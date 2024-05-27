import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));

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
app.use("/image-morph/api/v1/user/image", aiRouter);

export { app };
