import type { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import type { TDecodedUser } from "../../types";

const getMyUserInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userInfo = req.user;

    const result = await UserServices.getMyUserInfoFromDB(
      userInfo as TDecodedUser,
    );

    sendResponse(res, {
      success: true,
      message: "User Info Retrieve Successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

export const UserControllers = {
  getMyUserInfo,
};
