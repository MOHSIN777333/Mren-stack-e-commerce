export const forgotPasswordEmailTemplate = (resetPasswordUrl) => {
  return `
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px 0;">
    <tr>
      <td align="center">
        <!-- Email Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background:#111827; padding:20px; text-align:center;">
              <h2 style="color:#ffffff; margin:0;">Your Company Name</h2>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:30px;">
              <h3 style="margin-top:0; color:#333;">Reset Your Password</h3>
              <p style="color:#555; line-height:1.6;">
                Hello,
              </p>
              <p style="color:#555; line-height:1.6;">
                We received a request to reset your password. Click the button below to set a new password.
              </p>
              <!-- Button -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin:30px 0;">
                <tr>
                  <td align="center">
                    <a href="${resetPasswordUrl}"
                       style="background:#10b981; color:#ffffff; padding:14px 28px; text-decoration:none; border-radius:6px; display:inline-block; font-weight:bold;">
                       Reset Password
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color:#555; line-height:1.6;">
                This link will expire in <strong>15 minutes</strong>.
              </p>
              <p style="color:#555; line-height:1.6;">
                If you did not request a password reset, please ignore this email.
              </p>
              <p style="color:#555; margin-top:30px;">
                Thanks,<br/>
                The Support Team
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#888;">
              © 2026 Your Company Name. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
`;
};
