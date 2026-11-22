import type { CookieOptions, NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import type { TDecodedUser } from "../../types";
import { clearCookieOptions } from "../auth/auth.consts";
import type { UserRoles, UserStatus } from "../../../generated/prisma/enums";

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

const updateMyUserInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;

    const result = await UserServices.updateMyUserInfoOnDB(
      id as string,
      payload,
    );

    sendResponse(res, {
      success: true,
      message: "User Info Updated Successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

const changeMyPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;

    const result = await UserServices.changeMyPasswordFromDB(
      id as string,
      payload,
    );

    res.clearCookie("accessToken", clearCookieOptions as CookieOptions);

    res.clearCookie("refreshToken", clearCookieOptions as CookieOptions);

    sendResponse(res, {
      success: true,
      message: "User password has been changed successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

const updateProfilePicture = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.file;

    const result = await UserServices.updateProfilePictureOnDB(
      id as string,
      payload,
    );

    sendResponse(res, {
      success: true,
      message: "User Profile Picture Updated Successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

const deleteMyAccount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;

    const result = await UserServices.deleteMyAccountFromDB(id as string);

    res.clearCookie("accessToken", clearCookieOptions as CookieOptions);
    res.clearCookie("refreshToken", clearCookieOptions as CookieOptions);

    sendResponse(res, {
      success: true,
      message: "User Account deleted successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

//admin apis
const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const queries = req.query;

    const result = await UserServices.getAllUserFromDB(id as string, queries);

    sendResponse(res, {
      success: true,
      message: "Users data retrieve successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

const getUserDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;

    const payload = req.params.id;

    const result = await UserServices.getUserDetailsFromDB(
      id as string,
      payload as string,
    );

    sendResponse(res, {
      success: true,
      message: "User details retrieve successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

const changeUserStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;

    const userId = req.params.id;

    const payload = req.body;

    const result = await UserServices.changeUserStatusOnDB(
      id as string,
      userId as string,
      payload as { status: UserStatus },
    );

    sendResponse(res, {
      success: true,
      message: "User status changed successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

const changeUserRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;

    const userId = req.params.id;

    const payload = req.body;

    const result = await UserServices.changeUserRoleOnDB(
      id as string,
      userId as string,
      payload as { role: UserRoles },
    );

    sendResponse(res, {
      success: true,
      message: "User role changed successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

export const UserControllers = {
  getMyUserInfo,
  updateMyUserInfo,
  changeMyPassword,
  updateProfilePicture,
  deleteMyAccount,
  getAllUser,
  getUserDetails,
  changeUserStatus,
  changeUserRole,
};
