import { Request, Response } from "express";
import crypto from "crypto"
import bcrypt from "bcrypt"
import z from "zod"
import User, { IUser } from "./../../models/user"
import sendEmail from "../../utils/sendEmail";
import { SendMailOptions } from "nodemailer";

const resetPasswordTokenSchema = z.object({
    email: z.string().email()
}).strict()

const resetPasswordToken = async function (req: Request, res: Response): Promise<void> {
    const body = req.body;
    console.log(req.protocol, " ", req.get('host'))
    const { success } = resetPasswordTokenSchema.safeParse(body);

    if (!success) {
        res.status(400).json({
            message: "Invalid inputs, Please check your inputs"
        })
        return
    }

    try {
        const userExists: IUser | null = await User.findOne({ email: body.email })

        if (!userExists) {
            res.status(400).json({
                message: "User does not exists, please signup"
            })
            return
        }

        const OTP = String(crypto.randomInt(100000, 999999))
        const currentDate = new Date()
        const expiryDate = new Date(currentDate.getTime() + 15 * 60 * 1000);

        userExists.resetPasswordToken = bcrypt.hashSync(OTP, 10)
        userExists.resetPasswordTokenExpiry = expiryDate

        await userExists.save()

        const emailOptions: SendMailOptions = {
            from: `Parth Hariyani <parthhariyani00@gmail.com>`,
            to: body.email,
            subject: 'Reset Password Token',
            text: 'Hello, this is a test email sent using Nodemailer and EmailTrap.',
            html: `
            <div style='padding:10px; font-family:verdana'>
                <h1>Your One-Time Password (OTP)</h1>
                <p>Your OTP is: <strong>${OTP}</strong></p>
                <p>This OTP will expire in 15 minutes.</p>
                <p>If you didn't request this OTP, please ignore this email.</p>
            </div>
            `
        }

        await sendEmail(emailOptions)

        res.status(200).json({
            message: "Reset password URL sent"
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            message: "Could not send the email"
        })
    }

}

export default resetPasswordToken