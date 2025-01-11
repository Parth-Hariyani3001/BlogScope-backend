import { Request, Response } from "express";
import z from "zod"
import Blog, { IBlog } from "./../../models/blog"

const createBlogSchema = z.object({
    title: z.string(),
    content: z.string().min(30),
    status: z.enum(['published', 'archived']),
    tags: z.array(z.string()).optional(),
    category: z.string().optional()
}).strict()

const createBlog = async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    const { success } = createBlogSchema.safeParse(body);

    if (!success) {
        res.status(400).json({
            message: "Invalid inputs, please check your inputs"
        })
        return;
    }

    const id = res.locals.id;

    try {
        const tags: string[] = body.tags.map((tag: string) => tag.toLowerCase())
        const blog: IBlog = new Blog({
            title: body.title,
            content: body.content,
            author: id,
            status: body.status,
            tags,
            category: body.category.toLowerCase()
        })

        await blog.save()

        res.status(200).json({
            blog
        })

    } catch (e) {
        res.status(400).json({
            message: "User not found"
        })
    }
}

export default createBlog