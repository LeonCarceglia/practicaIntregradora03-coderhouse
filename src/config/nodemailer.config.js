import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "leoncarceglia@gmail.com",
        pass: "qsjw oert exwo hrxe"
    }
})