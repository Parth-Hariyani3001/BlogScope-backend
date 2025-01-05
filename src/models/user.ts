import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    _id: string,
    name: string;
    password: string;
    email: string;
    role?: string;
    socials?: Map<String, String>;
    about?: string | null
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        maxLength: 25
    },
    about: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        lowercase: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'viewer'],
        default: 'user'
    },
    password: {
        type: String,
        minLength: [6, 'minimum 6 digit password is required'],
        required: true
    },
    socials: {
        type: Map,
        of: String,
        default: {}
    }
}, {
    timestamps: true
})

const User = mongoose.model<IUser>('user', userSchema)
export default User