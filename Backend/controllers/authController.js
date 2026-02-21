import { connectDB } from "../config/databases/db.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { ErrorHandle } from "../middleware/errorMiddleware.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/jwtToken.js";
import { generatResetPasswordToken } from "../utils/generatResetPasswordToken.js";
import { forgotPasswordEmailTemplate } from "../utils/forgotPasswordEmailTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandle("all field are required", 400));
  }

  const existsUser = await connectDB.query(
    `SELECT * FROM users WHERE email = $1`,
    [email],
  );

  if (existsUser.rows.length > 0) {
    return next(new ErrorHandle("user is alreadly exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await connectDB.query(
    `INSERT INTO users(name, email, password) 
         VALUES($1, $2, $3) RETURNING *`,
    [name, email, hashedPassword],
  );

  sendToken(user.rows[0], 201, "user resistered successfully", res);
});
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandle("please provide email or password"));
  }

  const user = await connectDB.query(
    `
    SELECT * FROM users WHERE email = $1`,
    [email],
  );
  if (user.rows[0].length === 0) {
    return next(new ErrorHandle("invalid email or password"));
  }

  const isPasswordMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!isPasswordMatch) {
    return next(new ErrorHandle("password do not match"));
  }
  sendToken(user, 200, "logged In..", res);
});
export const getUser = catchAsyncError(async (req, res, next) => {
  const { user } = req;
  console.log(user);

  res.status(200).json({
    success: true,
    user,
  });
});
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "user logout successfully",
    });
});
export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const { frontendurl } = req.prame;

  const findUser = await connectDB.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );
  if (findUser.rows.length === 0) {
    return next(new ErrorHandle("invalid email this is email no found", 404));
  }
  const user = findUser.rows[0];
  const { resetToken, hashPassword, resetTokenExpires } =
    generatResetPasswordToken();

  await connectDB.query(
    "UPDTAE users SET reset_password_token = $1  reset_expire = to_timestamp($2) WHERE email = $3",
    [hashPassword, resetTokenExpires / 1000, email],
  );

  const resetPasswordUrl = `${frontendurl}/password/reset/${resetToken}`;
  const message = forgotPasswordEmailTemplate(resetPasswordUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "ECOMMERCE PASSWORD RECOVERLY",
      message,
    });
    res.status(200).json({
      success: true,
      message: `email send to ${user.email} successfully`,
    });
  } catch (error) {
    await connectDB.query(
      "UPDATE users SET reset_password_token = NULL reset_expire = NULL WHERE email = $1",
      [email],
    );
  }
});
