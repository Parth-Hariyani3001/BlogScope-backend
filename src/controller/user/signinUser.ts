import bcrypt from "bcrypt"
import { Request, Response } from "express";
import { z } from "zod"

import User, { IUser } from "./../../models/user"
import signToken from "../../utils/jwtSign";

const signinUserSchema = z.object({
    email: z.string().email(),
    password: z.string()
})


const signinUser = async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    const { success } = signinUserSchema.safeParse(body);

    if (!success) {
        res.status(401).json({
            message: "Incorrect email or password"
        })
        return
    }

    try {
        const user: IUser | null = await User.findOne({ email: body.email })

        const isPasswordCorrect = bcrypt.compareSync(body.password, user?.password || "")

        if (!isPasswordCorrect) {
            res.status(401).json({
                message: "Incorrect email or password"
            })
            return;
        }

        const token = signToken({
            id: user?._id || '',
            role: user?.role || ''
        })

        res.status(200).json({
            token
        })

    } catch (e) {
        res.status(401).json({
            message: "Incorrect email or password"
        })
    }
}


export default signinUser