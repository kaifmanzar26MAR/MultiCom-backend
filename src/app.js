import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import homeRouter from "./routes/home.routes.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes declaration
app.use("/", homeRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);

export { app };
