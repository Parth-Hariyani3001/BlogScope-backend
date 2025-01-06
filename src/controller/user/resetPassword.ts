
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import z from "zod"
import User, { IUser } from "./../../models/user"

const resetPasswordSchema = z.object({
    OTP: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
}).strict()

const resetPassword = async function (req: Request, res: Response) {
    const body = req.body;
    const { success } = resetPasswordSchema.safeParse(body);

    if (!success) {
        res.status(400).json({
            message: "Invalid inputs, Please check your inputs"
        })
        return
    }

    try {
        const user: IUser | null = await User.findOne({ email: body.email })

        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
            return
        }

        const currentDate = new Date()
        if (currentDate > (user.resetPasswordTokenExpiry ?? new Date(currentDate.getTime() - 1 * 60 * 60 * 1000))) {
            res.status(400).json({
                message: "OTP has been expired please generate new OTP"
            })
            return
        }

        const isValid = bcrypt.compareSync(body.OTP, user?.resetPasswordToken || '')

        if (!isValid) {
            res.status(400).json({
                message: "Invalid OTP, please resend"
            })
        }

        user.password = bcrypt.hashSync(body.password, 10)
        user.resetPasswordToken = ''
        user.resetPasswordTokenExpiry = null

        await user.save()

        res.status(200).json({
            message: "Password has been reset"
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            message: "Invalid inputs, Please check your inputs"
        })
    }

}

export default resetPassword;