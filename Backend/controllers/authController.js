import { connectDB } from "../config/databases/db.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { ErrorHandle } from "../middleware/errorMiddleware.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/jwtToken.js";

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
