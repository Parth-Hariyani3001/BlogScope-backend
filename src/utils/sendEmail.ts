import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import dotenv from "dotenv"
dotenv.config();

const sendEmail = async function (options: SendMailOptions) {

    const transport: Transporter = nodemailer.createTransport({
        host: process.env.EMAIL_TRAP_HOST || undefined,
        port: Number(process.env.EMAIL_TRAP_PORT) || undefined,
        auth: {
            user: process.env.EMAI_TRAP_USER || '',
            pass: process.env.EMAIL_TRAP_PASS || ''
        }
    })

    transport.sendMail(options, (error, info) => {
        if (error) {
            throw new Error("Could not send email")
        }
        console.log(`Message sent: ${info.messageId}`)
    })
}

export default sendEmail;