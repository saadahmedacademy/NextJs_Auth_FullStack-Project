import user from "@/app/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  const hashedToken = await bcrypt.hash(String(userId), 10);

  try {
    if (emailType === "VERIFY") {
      await user.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await user.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordExpiry: Date.now() + 3600000,
        },
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "78fe6359ef258c",
        pass: "c3b9ac6f999317",
      },
    });

    const mailOptions = {
      from: "saadahmed@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<div style='background-color: #f5f5f5; text-align: center; display: block; justify-content: center'>
              <p>Click the link below or copy-paste it in the browser to ${
                emailType === "VERIFY"
                  ? "Verify Your Email"
                  : "Reset Your Password"
              }</p>
              <a href="${
                process.env.DOMAIN
              }/verifyemail?token=${hashedToken}">click here</a>
             </div>`,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
