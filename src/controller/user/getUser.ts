import { Request, Response } from "express";
import User, { IUser } from "./../../models/user"

const getUser = async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.params.id as string;
    console.log(userId)
    try {
        const user: IUser | null = await User.findById(userId).select('name email about socials')

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
            message: "User not found"
        })
    }
}


export default getUser