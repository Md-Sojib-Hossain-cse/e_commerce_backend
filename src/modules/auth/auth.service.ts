import type { TAuth } from "./auth.interface";

const registerUserOnDB = async (payload: TAuth) => {
  return await payload;
};

export const AuthServices = {
  registerUserOnDB,
};
