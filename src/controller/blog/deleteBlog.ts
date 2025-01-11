import { Request, Response } from "express";
import Blog, { IBlog } from "./../../models/blog"
import mongoose from "mongoose";

const deleteBlog = async (req: Request, res: Response): Promise<void> => {
    const authorId = res.locals.id;
    const role = res.locals.role;
    const id = req.params.id;

    try {
        const blog: IBlog | null = await Blog.findById(id);

        if (!blog) {
            res.status(400).json({
                message: "blog does not exists"
            })
            return;
        }

        if (blog.author.toString() == authorId || role === 'admin') {
            await blog.deleteOne({ _id: new mongoose.Types.ObjectId(id) })

            res.status(200).json({
                message: "Blog deleted successfully"
            })
            return

        } else {
            res.status(401).json({
                message: "Unauthorized, you are not allowed to delete the blog"
            })
            return
        }
    } catch (e) {
        res.status(400).json({
            message: "User not found"
        })
    }
}

export default deleteBlog