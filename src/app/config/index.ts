import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  imagebb_api_key: process.env.IMAGEBB_API_KEY,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  from_email: process.env.FROM_EMAIL,
  from_pass: process.env.FROM_PASS,
  zerocrypto_api_key: process.env.ZEROCRYPTO_API_KEY,
  zerocrypto_secret_key: process.env.ZEROCRYPTO_SECRET_KEY,
  payment_api: process.env.PAYMENT_API,
  success_url: process.env.SUCCESS_URL,
  failed_url: process.env.FAILED_URL,
  zerocrypto_token: process.env.ZEROCRYPTOPAY_TOKEN,
  secret_key: process.env.ZEROCRYPTOPAY_SECRET_KEY,
  login: process.env.ZEROCRYPTOPAY_LOGIN,
  api_key: process.env.ZEROCRYPTOPAY_API_URL,
};
