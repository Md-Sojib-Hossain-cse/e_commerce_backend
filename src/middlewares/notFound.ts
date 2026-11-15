import type { Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";

export const notFound = (req: Request, res: Response) => {
  sendResponse(res, {
    success: false,
    message: "Route Not Found!",
    statusCode : 404
  });
};
