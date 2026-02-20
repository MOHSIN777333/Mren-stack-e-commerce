import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import { ErrorHandle } from "./errorMiddleware.js";
import { connectDB } from "../config/databases/db.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  console.log("token", token);

  if (!token) {
    return next(new ErrorHandle("first go to login then do this", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SERCET);

  const user = await connectDB.query(
    "SELECT * FROM users WHERE id = $1 LIMIT 1",
    [decoded.id],
  );

  req.user = user.rows[0];
  next();
});

export const AuthorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandle(
          `roles: ${req.user.role} is not allwo to access to this resource`,
          403,
        ),
      );
    }
    next();
  };
};
