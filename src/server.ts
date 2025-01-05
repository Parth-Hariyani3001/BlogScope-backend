import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"

import connectDB from "./db";

import userRouter from "./routes/userRouter"

dotenv.config();

// Initialize
const app: Express = express()

// global middlewares
app.use(express.json())

// DB connection
connectDB(process.env.DB_URL || "")

// routes
app.use('/api/v1/user', userRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})