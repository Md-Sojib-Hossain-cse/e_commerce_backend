import AppError from "../errors/appError";
import httpStatus from "http-status";

const parseQueryDate = (value: unknown): Date | undefined => {
  if (typeof value !== "string" || !value.trim()) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid date format!");
  }

  return date;
};

export default parseQueryDate;
