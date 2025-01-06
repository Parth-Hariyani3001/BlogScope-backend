import { Request, Response } from "express";
import z from "zod"
import User, { IUser } from "./../../models/user"

const updateBodySchema = z.object({
    name: z.string().optional(),
    about: z.string().optional(),
    email: z.string().optional(),
    socials: z.record(z.string(), z.string()).optional()
}).strict()

const updateUser = async (req: Request, res: Response): Promise<void> => {
    const body = req.body;

    if (Object.keys(body).length === 0) {
        res.status(400).json({
            message: "Nothing to update"
        })
        return;
    }

    const { success } = updateBodySchema.safeParse(body);

    if (!success) {
        res.status(400).json({
            message: "Invalid inputs, please check your inputs"
        })
        return;
    }

    const id = res.locals.id;

    try {
        const user: IUser = await User.findByIdAndUpdate(id, body, { new: true }).select('name email about socials')

        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
            return
        }

        res.status(200).json({
            user
        })

    } catch (e) {
        res.status(400).json({
            message: "Users not found"
        })
    }
}


export default updateUser