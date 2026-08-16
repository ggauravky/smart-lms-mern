import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail = async (to, subject, otp) => {
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; padding: 40px 0; background-color: #f4f6f9;">
      <tr>
        <td align="center">
          <table role="presentation" style="width: 100%; max-width: 520px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
            
            <!-- Header with Brand -->
            <tr>
              <td style="background-color: #111827; padding: 32px 40px; text-align: center;">
                <div style="display: inline-block;">
                  <span style="background-color: #ffffff; color: #111827; font-weight: 800; font-size: 18px; padding: 6px 12px; border-radius: 8px; letter-spacing: 1px; font-family: sans-serif; margin-right: 8px;">SL</span>
                  <span style="color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; vertical-align: middle;">SMART LMS</span>
                </div>
              </td>
            </tr>

            <!-- Content Area -->
            <tr>
              <td style="padding: 40px 40px 30px 40px;">
                <h2 style="margin: 0 0 12px 0; color: #111827; font-size: 22px; font-weight: 700; text-align: center;">Password Reset Request</h2>
                <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 15px; line-height: 1.6; text-align: center;">
                  We received a request to reset the password for your <strong>Smart LMS</strong> account. Use the Verification Code below to proceed:
                </p>

                <!-- OTP Display Box -->
                <div style="background-color: #f9fafb; border: 2px dashed #d1d5db; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
                  <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #6b7280; font-weight: 600; display: block; margin-bottom: 8px;">Your OTP Code</span>
                  <span style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 800; letter-spacing: 8px; color: #111827; display: block;">${otp}</span>
                </div>

                <p style="margin: 0 0 20px 0; color: #ef4444; font-size: 13px; font-weight: 600; text-align: center;">
                  ⏱ This OTP is valid for <strong>5 minutes</strong> only.
                </p>

                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 28px 0;" />

                <p style="margin: 0; color: #9ca3af; font-size: 13px; line-height: 1.5; text-align: center;">
                  If you didn't request this password reset, please ignore this email or contact support. Your account remains secure.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f9fafb; padding: 20px 40px; text-align: center; border-top: 1px solid #f3f4f6;">
                <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                  © ${new Date().getFullYear()} Smart LMS Portal. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: `"Smart LMS" <${process.env.USER_EMAIL}>`,
    to: to,
    subject: subject,
    text: `Your Smart LMS Password Reset OTP is: ${otp}. It will expire in 5 minutes.`,
    html: htmlContent,
  });
};

export default sendMail;