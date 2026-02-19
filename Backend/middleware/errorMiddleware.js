export class ErrorHandle extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || " INTERNAL SERVER ERROR";
  err.statusCode = err.statusCode || 500;

  if (err.Code === 11000) {
    const message = "duplicate field value entered";
    err = new ErrorHandle(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "invalid json web token try again";
    err = new ErrorHandle(message, 500);
  }

  if (err.name === "TokenExpiredError") {
    const message = "json web token expired try again";
    err = new ErrorHandle(message, 500);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join("  ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};
