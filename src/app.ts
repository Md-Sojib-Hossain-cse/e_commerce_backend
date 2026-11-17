import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import pino from "pino-http";
import { config } from "./config";
import { notFound } from "./middlewares/notFound";
import router from "./routes";

const app: Application = express();

//security middleware
app.use(helmet());

//CORS middleware
app.use(
  cors({
    origin: [config.frontend_url_dev!],
  }),
);

// 3. HTTP Request Logging
app.use(
  pino({
    redact: [
      "req.headers.authorization",
      "req.headers.cookie",
      "res.headers.set-cookie",
    ],
  }),
);

//body parsing middlewares
app.use(express.json({ limit: "1mb" }));
app.use(
  express.urlencoded({
    extended: true,
  }),
);

//Cookie parsing middleware
app.use(cookieParser());

// Root Server Route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to CCL E-commerce server!");
});

// Version 1 Root Route
app.get("/api/v1", (req: Request, res: Response) => {
  res.send("Welcome to CCL E-commerce server version 1 is boosted on🔥🔥!");
});

app.use("/api/v1", router);

app.use(notFound);

export default app;
