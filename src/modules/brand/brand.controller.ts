import type { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BrandServices } from "./brand.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createBrand = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;
    const images = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const result = await BrandServices.createBrandOnDB(
      id as string,
      payload,
      images,
    );

    sendResponse(res, {
      success: true,
      message: "Brand Created successfully!",
      statusCode: httpStatus.CREATED,
      data: result,
    });
  },
);

const updateBrand = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const slug = req.params.slug;
    const payload = req.body;
    const images = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const result = await BrandServices.updateBrandOnDB(
      id as string,
      slug as string,
      payload,
      images,
    );

    sendResponse(res, {
      success: true,
      message: "Brand updated successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

const getAllBrand = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    const result = await BrandServices.getAllBrandApiFromDB(query);

    sendResponse(res, {
      success: true,
      message: "Brands retrieve successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

const getSpecificBrand = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;

    const result = await BrandServices.getSpecificBrandFromDB(slug as string);

    sendResponse(res, {
      success: true,
      message: "Brand retrieve successfully!",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

export const BrandControllers = {
  createBrand,
  updateBrand,
  getAllBrand,
  getSpecificBrand,
};
