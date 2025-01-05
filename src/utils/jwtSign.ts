import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()

interface JwtObject {
    id: string,
    role: string
}

function signToken(obj: JwtObject) {
    const token = jwt.sign(obj, process.env.JWT_SECRET || '', { expiresIn: '7d' })
    return token
}

export default signToken