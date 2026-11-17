import { z } from "zod";
import catchAsync from "../utils/catchAsync";

export const validateSchema = (schema: z.ZodType) => {
  return catchAsync(async (req, res, next) => {
    const validatedData = schema.parse(req.body);

    req.body = validatedData;

    next();
  });
};
