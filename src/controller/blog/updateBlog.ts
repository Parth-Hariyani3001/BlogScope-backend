import { Request, Response } from "express"
import z from "zod"
import Blog, { IBlog } from "./../../models/blog"

const updateBlogBodySchema = z.object({
    title: z.string().optional(),
    content: z.string().min(30).optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional()
}).strict()

const updateBlog = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const userId = res.locals.id;
    const body = req.body;

    try {

        if (Object.keys(body).length === 0) {
            res.status(400).json({
                message: "Nothing to update"
            })
            return;
        }

        const { success } = updateBlogBodySchema.safeParse(body);

        if (!success) {
            res.status(400).json({
                message: "Invalid inputs, please check your inputs"
            })
            return;
        }

        const blog: IBlog | null = await Blog.findByIdAndUpdate(id, body, {
            new: true
        }).where('author').equals(userId)


        res.status(200).json({
            blog,
            message: "blog updated"
        })
    } catch (e) {
        console.log(e)
        res.status(401).json({
            message: "Could not update the blog"
        })
    }
}

export default updateBlog