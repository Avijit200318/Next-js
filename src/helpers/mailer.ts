import nodemailer from "nodemailer";
import userModel from "@/models/userModel";
import bryptjs from "bcryptjs";

// go to mailtrap
// go nodemaioler -> https://www.nodemailer.com/

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await userModel.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 360000
            }, { new: true, runValidators: true })
        } else if (emailType === "RESET") {
            await userModel.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpirey: Date.now() + 360000
            }, { new: true, runValidators: true })
        }


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: 'avijithira14@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.domain}/verifyEmail?token=${hashedToken}">here</a> to ${emailType === "VERIFY"? "Verify your email" : "reset your password"} 
            or copy and paste the link below in your browser.<br> ${process.env.domain}/verifyEmail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}