import type { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authInfo = req.body;
    const result = await AuthServices.registerUserOnDB(authInfo);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "User Registered Successfully!",
      success: true,
      data: result,
    });
  },
);

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authInfo = req.body;

    const result = await AuthServices.loginUserFromDB(authInfo);

    //set token into http only cookie
    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
    });
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: result.isRemember
        ? 1000 * 60 * 60 * 24 * 30 // 30day
        : 1000 * 60 * 60 * 24 * 1, // 1 day
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "User Logged In Successfully!",
      success: true,
      data: null,
    });
  },
);

const googleAuth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await AuthServices.googleAuthService(payload);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
    });
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30day
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Google Authentication Successful!",
      success: true,
      data: result,
    });
  },
);

export const AuthControllers = {
  registerUser,
  loginUser,
  googleAuth,
};
