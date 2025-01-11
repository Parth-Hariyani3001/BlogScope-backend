import mongoose, { Document, Types, Model } from "mongoose"

export interface IBlog extends Document {
    _id: string,
    __v: number,
    title: string,
    content: string,
    author: Types.ObjectId,
    status: string,
    tags: string[],
    category: string
}

// softDelete: () => Promise<IUser>;

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required']
    },
    content: {
        type: String,
        minLength: [30, 'minumum 30 characters are required'],
        require: [true, 'Content for blog is required']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    status: {
        type: String,
        enum: ['published', 'archived']
    },
    tags: {
        type: Array
    },
    category: {
        type: String
    }
}, {
    timestamps: true
})

const Blog = mongoose.model<IBlog>('blog', blogSchema)
export default Blog