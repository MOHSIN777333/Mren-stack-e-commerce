import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import { ErrorHandle } from "./errorMiddleware.js";
import { connectDB } from "../config/databases/db.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = body.cookie;
  if (!token) {
    return next(new ErrorHandle("first register then authendicated", 400));
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
    if (!roles.includes(req.user.roles)) {
      return next(
        new ErrorHandle(
          `roles: ${req.user.roles} is not allwo to access to this resource`,
        ),
      );
    }
    next();
  };
};
