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

export const BrandControllers = {
  createBrand,
};
