import { Request, Response } from "express";
import Blog, { IBlog } from "./../../models/blog";
import mongoose from "mongoose";

const getArchivedBlogs = async (req: Request, res: Response): Promise<void> => {
    const id = res.locals.id;
    try {
        const blogs: IBlog[] | null = await Blog.find({
            status: "archived",
            author: new mongoose.Types.ObjectId(id)
        })

        if (!blogs) {
            res.status(400).json({
                message: "No archived posts",
            });
            return;
        }

        res.status(200).json({
            blogs,
        });

    } catch (e) {
        console.log(e)
        res.status(400).json({
            message: "Could not fetch blog",
        });
    }
}

export default getArchivedBlogs;