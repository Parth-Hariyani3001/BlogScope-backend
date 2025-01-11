import { Request, Response } from "express";
import Blog, { IBlog } from "./../../models/blog";
import mongoose from "mongoose";

const getBlog = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;

        const blog: IBlog | null = await Blog.findOne({ _id: new mongoose.Types.ObjectId(id), status: 'published' }).populate(
            "author",
            "name socials"
        );

        if (!blog) {
            res.status(400).json({
                message: "Blog not found",
            });
            return;
        }

        res.status(200).json({
            blog,
        });

    } catch (e) {
        console.log(e)
        res.status(400).json({
            message: "Could not fetch blog",
        });
    }
};

export default getBlog;
