import { Request, Response } from "express";
import z from "zod"
import User, { IUser } from "./../../models/user"
import mongoose, { ObjectId } from "mongoose";

const deleteBodySchema = z.object({
    id: z.string()
}).strict()

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    const { success } = deleteBodySchema.safeParse(body);

    if (!success) {
        res.status(400).json({
            message: "Invalid inputs, please check your inputs"
        })
        return;
    }

    const id = res.locals.id;
    const role = res.locals.role

    try {
        const user: IUser | null = await User.findById(body.id);

        if (!user) {
            res.status(400).json({
                message: "User does not exists"
            })
            return;
        }

        if (user._id.toString() == id || role === 'admin') {
            await user.softDelete()

            res.status(200).json({
                message: "User deleted successfully"
            })

            return
        } else {

            res.status(401).json({
                message: "Unauthorized, you are not allowed to delete the user"
            })
            return
        }
    } catch (e) {
        res.status(400).json({
            message: "User not found"
        })
    }
}


export default deleteUser