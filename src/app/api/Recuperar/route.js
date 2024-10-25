import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { Resend } from 'resend';


export async function POST(request) {
    const resend = new Resend('re_Mm28Rar8_ALkXVJUDUPGvVesfLTpiJCPi');
    try {
        console.log("Entrando al post")
        const datos = await request.json()
        const codigo = Math.floor(100000 + Math.random() * 900000); // Código de 6 dígitos
        console.log(codigo)
        try {
            /*
                        const transporter = nodemailer.createTransport({
                            host: process.env.EMAIL_HOST,
                            port: process.env.EMAIL_PORT,
                            secure: false,
                            auth: {
                                user: process.env.EMAIL_USER,
                                pass: process.env.EMAIL_PASS,
                            },
                        });
                        const mailOptions = {
                            from: `"Mapri-bot" <${process.env.EMAIL_USER}>`,
                            to: ['walthersc11@gmail.com'],
                            subject: 'Mapri-bot Clave para restaurar contraseña',
                            text: mensajeCorreo
                        };*/
            const mensajeCorreo = `Hola te saluda Mapribot - El codigo de verificacion es ${codigo}`

            const data = await resend.emails.send({
                from: '"Acme" <onboarding@resend.dev>',
                to: [datos.correo],
                subject: 'Mapri-bot Clave para restaurar contraseña',
                text: mensajeCorreo
            })
            console.log(data)
            console.log("Entrando a hasear el token")
            const hashedPassword = await bcrypt.hash((String)(codigo), parseInt(process.env.saltRounds));
            //const data = await transporter.sendMail(mailOptions);
            console.log(data)
            console.log("Se esta enviando la data")
            return NextResponse.json({ mensaje: "Se envio el correo de manera correcta", token: hashedPassword }, { status: 200 })
        } catch (e) {
            console.error("Error al enviar el correo:", e); // Imprime el error
            return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ error: "Token no valido" }, { status: 500 })
    }
}

