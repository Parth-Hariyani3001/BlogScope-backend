import bcrypt from "bcrypt"
import { Request, Response } from "express";
import { z } from "zod"

import User from "./../../models/user"
import signToken from "../../utils/jwtSign";

const signupUserSchema = z.object({
    name: z.string().max(25),
    password: z.string().min(6),
    email: z.string().email(),
    role: z.enum(["admin", "user", "viewer"]).optional(),
    socials: z.record(z.string(), z.string()).optional(),
    about: z.string().optional()
})

const signupUser = async (req: Request, res: Response): Promise<void> => {
    const body = req.body

    if (body.role === 'admin') {
        res.status(400).json({
            message: "You cannot create admin accoun"
        })
        return
    }

    const { success } = signupUserSchema.safeParse(body)

    if (!success) {
        res.status(400).json({
            message: "Invalid inputs, Please check your inputs"
        })
        return
    }

    try {
        const isExisting = await User.findOne({
            email: body.email
        })

        if (isExisting) {
            res.status(400).json({
                message: "User already exsist"
            })
            return
        }

        let user = new User(body)
        user.password = bcrypt.hashSync(user.password, 10)
        await user.save()

        const token = signToken({
            id: user._id.toString() || '',
            role: user.role || ''
        })

        res.status(200).json({
            token
        })
    } catch (e) {
        res.status(400).json({
            message: "Invalid inputs, Please check your inputs"
        })
        return
    }
}

export default signupUser;