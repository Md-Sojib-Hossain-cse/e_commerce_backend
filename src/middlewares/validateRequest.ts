import { z } from "zod";
import catchAsync from "../utils/catchAsync";

type TValidationSchema = {
  body?: z.ZodType;
  query?: z.ZodType;
  params?: z.ZodType;
};

const validateRequest = (schemas: TValidationSchema) => {
  return catchAsync(async (req, res, next) => {
    if (schemas.body) {
      req.body = schemas.body.parse(req.body);
    }

    if (schemas.query) {
      const validatedQuery = schemas.query.parse(req.query);

      Object.defineProperty(req, "query", {
        value: validatedQuery,
        writable: true,
        configurable: true,
      });
    }

    if (schemas.params) {
      req.params = schemas.params.parse(req.params) as typeof req.params;
    }

    next();
  });
};

export default validateRequest;
