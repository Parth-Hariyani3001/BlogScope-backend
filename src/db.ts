import mongoose from "mongoose";

const connectDB = async function (url: string) {
    try {
        await mongoose.connect(url)
        console.log("DB connected successfully")
    } catch (e) {
        console.log(e)
    }
}

export default connectDB;