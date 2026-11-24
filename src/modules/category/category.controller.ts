import type { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { CategoryServices } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const image = req.file;

    const payload = req.body;

    const result = await CategoryServices.createCategoryOnDB(
      id as string,
      payload,
      image as Express.Multer.File,
    );

    sendResponse(res, {
      success: true,
      message: "Category created successfully!",
      statusCode: httpStatus.CREATED,
      data: result,
    });
  },
);

export const CategoryController = {
  createCategory,
};
