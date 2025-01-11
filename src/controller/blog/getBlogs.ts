import { Request, Response } from "express";
import Blog, { IBlog } from "./../../models/blog"

const getBlogs = async (req: Request, res: Response): Promise<void> => {

    try {
        const { category = '', tags = '', limit = '10', skip = '0', sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

        // Getting limit and skip numbers
        const pageLimit: number = parseInt(limit as string) || 10
        const pageSkip: number = parseInt(skip as string) || 0

        // prepare filter object
        let filters: Record<string, any> = {}

        // filter out archived posts
        filters.status = 'published'

        // category filter
        if (category) {
            filters.category = category
        }

        // apply tags
        if (tags) {
            filters.tags = { $in: (tags as string).split(',').map((tag: string) => tag.toLowerCase()) };
        }

        // defining sort: default by createdAt, and descending order
        const sortField: string = sortBy as string || "createdAt";
        const sortDirection: 1 | -1 = sortOrder === 'desc' ? -1 : 1

        const blogs: IBlog[] = await Blog.find(filters)
            .sort({ [sortField]: sortDirection })
            .skip(pageSkip)
            .limit(pageLimit)
            .populate("author", "name socials");

        if (!blogs) {
            res.status(400).json({
                message: "No posts",
            });
            return;
        }

        res.status(200).json({
            blogs
        })

    } catch (e) {
        console.log(e)
        res.status(400).json({
            message: "Could not fetch blogs"
        })
    }
}

export default getBlogs