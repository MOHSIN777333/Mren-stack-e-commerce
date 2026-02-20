import crypto from "crypto";

const generatResetPasswordToken = () => {
  const resetToken = crypto.randomBytes("20").toString("hex");

  const hashPassword = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const resetTokenExpires = Date.now() + 15 * 60 * 1000;

  return { resetToken, hashPassword, resetTokenExpires };
};
