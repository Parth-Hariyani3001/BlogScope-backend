import { Request, Response } from "express";
import User, { IUser } from "./../../models/user"

const getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] | null = await User.find().select('name email about socials')

        if (!users) {
            res.status(404).json({
                message: "Users not found"
            })
            return
        }

        res.status(200).json({
            users
        })

    } catch (e) {
        res.status(400).json({
            message: "Users not found"
        })
    }
}


export default getUsers