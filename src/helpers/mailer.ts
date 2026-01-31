import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            );
        }
        // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER, // Reads a2af9bb064288c
            pass: process.env.MAILTRAP_PASS  // Reads 26b285c4277bc1
        }
    });
        const route = emailType === "RESET" ? "resetpassword" : "verifyemail";
        
        const actionUrl = `${process.env.DOMAIN}/${route}?token=${hashedToken}`;
        const mailOptions = {
            from: 'shudhanshuchaturvedi47@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${actionUrl}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
            or copy and paste the link below in your browser. <br> ${actionUrl}</p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    } catch (error:any) {

        throw new Error(error.message);
    }
}