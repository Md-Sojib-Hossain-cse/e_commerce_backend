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

const getAllCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    const result = await CategoryServices.getAllCategoryFromDB(query);

    sendResponse(res, {
      success: true,
      message: "Categories retrieve successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

const getSpecificCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;

    const result = await CategoryServices.getSpecificCategoryFromDB(
      slug as string,
    );

    sendResponse(res, {
      success: true,
      message: "Category retrieve successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

const updateCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const slug = req.params.slug;
    const payload = req.body;
    const image = req.file;

    const result = await CategoryServices.updateCategoryOnDB(
      id as string,
      slug as string,
      payload,
      image,
    );

    sendResponse(res, {
      success: true,
      message: "Category updated successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

const deleteCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const slug = req.params.slug;

    const result = await CategoryServices.deleteCategoryFromDB(
      id as string,
      slug as string,
    );

    sendResponse(res, {
      success: true,
      message: "Category deleted successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

export const CategoryController = {
  createCategory,
  getAllCategory,
  getSpecificCategory,
  updateCategory,
  deleteCategory,
};
