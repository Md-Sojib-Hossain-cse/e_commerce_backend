import type { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

const registerUser = async (req: Request, res: Response) => {
  const authInfo = req.body;

  const result = await AuthServices.registerUserOnDB(authInfo);
  sendResponse(res, {
    statusCode: 200,
    message: "User Registered Successfully!",
    success: true,
    data: result,
  });
};

export const AuthControllers = {
  registerUser,
};
