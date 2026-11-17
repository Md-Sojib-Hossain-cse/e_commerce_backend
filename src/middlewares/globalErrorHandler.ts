import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import AppError from "../errors/appError";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/client";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message: string = "Something went wrong!";
  let errorName: string = "InternalServerError";

  let errors: { field: string; message: string }[] = [];

  // 1. Custom Application Error
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorName = error.name;
  }

  // 2. Zod Validation Error
  else if (error instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Validation failed!";
    errorName = "ZodError";

    errors = error.issues.map((issue) => ({
      field: issue.path.length ? issue.path.join(".") : "unknown",
      message: issue.message,
    }));
  }

  // 3. Prisma Validation Error
  else if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Invalid database query. Please check the provided data.";
    errorName = "PrismaValidationError";
  }

  // 4. Prisma Known Request Error
  else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    errorName = "PrismaKnownRequestError";

    switch (error.code) {
      case "P2000":
        statusCode = httpStatus.BAD_REQUEST;
        message = "The provided value is too long for this database column.";
        break;

      case "P2001":
        statusCode = httpStatus.NOT_FOUND;
        message = "The requested record does not exist.";
        break;

      case "P2002":
        statusCode = httpStatus.CONFLICT;
        message = "A record with this value already exists.";
        break;

      case "P2003":
        statusCode = httpStatus.BAD_REQUEST;
        message = "Foreign key constraint failed.";
        break;

      case "P2004":
        statusCode = httpStatus.BAD_REQUEST;
        message = "A database constraint failed.";
        break;

      case "P2011":
        statusCode = httpStatus.BAD_REQUEST;
        message = "A required database field cannot be null.";
        break;

      case "P2012":
        statusCode = httpStatus.BAD_REQUEST;
        message = "A required value is missing.";
        break;

      case "P2014":
        statusCode = httpStatus.BAD_REQUEST;
        message = "The requested change violates a relation constraint.";
        break;

      case "P2015":
      case "P2018":
        statusCode = httpStatus.NOT_FOUND;
        message = "A related record could not be found.";
        break;

      case "P2025":
        statusCode = httpStatus.NOT_FOUND;
        message = "The requested record was not found.";
        break;

      case "P2023":
        statusCode = httpStatus.BAD_REQUEST;
        message = "Invalid data provided for a database field.";
        break;

      default:
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = "A database operation failed.";
    }
  }

  // 5. Prisma Initialization Error
  else if (error instanceof Prisma.PrismaClientInitializationError) {
    errorName = "PrismaInitializationError";

    switch (error.errorCode) {
      case "P1000":
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = "Database authentication failed.";
        break;

      case "P1001":
        statusCode = httpStatus.SERVICE_UNAVAILABLE;
        message = "Unable to connect to the database server.";
        break;

      case "P1002":
        statusCode = httpStatus.SERVICE_UNAVAILABLE;
        message = "Database connection timed out.";
        break;

      case "P1003":
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = "The requested database does not exist.";
        break;

      default:
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = "Database initialization failed.";
    }
  }

  // 6. Prisma Unknown Request Error
  else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = "An unknown database query error occurred.";
    errorName = "PrismaUnknownRequestError";
  }

  // 7. Prisma Rust Panic Error
  else if (error instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = "A critical database engine error occurred.";
    errorName = "PrismaRustPanicError";
  }

  // 8. Other JavaScript Errors
  else if (error instanceof Error) {
    message = error.message;
    errorName = error.name;
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    name: errorName,
    ...(errors.length > 0 && { errors }),
  });
};

export default globalErrorHandler;
