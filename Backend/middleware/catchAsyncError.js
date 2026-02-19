export const catchAsyncError = (AsyncHandle) => {
  return (req, res, next) => {
    Promise.resolve(AsyncHandle(req, res, next)).catch(next);
  };
};
