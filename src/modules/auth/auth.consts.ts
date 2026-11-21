import { config } from "../../config";

export const clearCookieOptions = {
  httpOnly: true,
  secure: config.node_env === "production",
  sameSite: "none",
  path: "/",
  maxAge: 0,
};
