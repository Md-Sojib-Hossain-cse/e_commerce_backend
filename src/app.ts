import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to CCL E-commerce server!");
});

app.get("/api/v1", (req: Request, res: Response) => {
  res.send("Welcome to CCL E-commerce server version 1 is boosted on🔥🔥!");
});

export default app;
