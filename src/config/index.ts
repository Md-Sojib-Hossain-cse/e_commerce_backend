import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL!,
  frontend_url_dev: process.env.FRONTEND_URL_DEV! || "http://localhost:3000",
  node_env: process.env.NODE_ENV! || "development",
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS! || 12,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET!,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET!,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN! || "1d",
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN! || "30d",
  google_client_id: process.env.GOOGLE_CLIENT_ID!,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET!,
  google_redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
};
