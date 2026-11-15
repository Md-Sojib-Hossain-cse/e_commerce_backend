import type { Response } from "express";

type TMeta = {
  page: number;
  limit: number;
  total: number;
};

type TResponse<T> = {
  success: Boolean;
  message: String;
  statusCode?: number;
  data?: T | T[];
  meta?: TMeta;
};

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const statusCode = data.statusCode || 500;
  res.status(statusCode).json({
    success: data.success,
    message: data.message || "Internal Server Error!",
    statusCode: statusCode,
    data: data.data,
    meta: data.meta,
  });
};
