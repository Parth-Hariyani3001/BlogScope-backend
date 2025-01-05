import { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config()

interface CustomJwtPayload extends JwtPayload {
    id: string;
    role: string;
}

const validateToken = async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    const authorization: string | undefined = req.headers.authorization;

    if (!authorization || !authorization?.startsWith("Bearer")) {
        res.status(401).json({
            message: "Unauthorized, please signin or create an account"
        })
        return
    }

    const token = authorization.split(' ')[1]

    try {
        const isValid: CustomJwtPayload = jwt.verify(token, process.env.JWT_SECRET || '') as CustomJwtPayload

        if (!isValid) {
            res.status(401).json({
                message: "Unauthorized, please signin or create an account"
            })
        }

        const { id, role }: { id: string, role: string } = isValid

        res.locals.id = id || ''
        res.locals.role = role || ''

        next()
    } catch (e: any) {

        if (e?.name === 'TokenExpiredError:') {
            res.status(401).json({
                message: "Session expired, Please sign in again"
            })
            return
        }

        res.status(401).json({
            message: "Unauthorized, please signin or create an account"
        })
    }
}

export default validateToken