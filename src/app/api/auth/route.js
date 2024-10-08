import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'
import { sql } from '@vercel/postgres';
import { serialize } from 'cookie';
import bcrypt from 'bcrypt';
import ContactarPsicologo from '@/app/Contactar/page';

export async function POST(req) {
    try {
        const { email, password } = await req.json();
//console.log(email + " / " + password )
        const resultado = await sql`
            SELECT idestudiante as cod, correo, contraseña, estado,'Estudiante' as tipo
            FROM estudiantes
            WHERE correo = ${email}
            UNION ALL
            SELECT iddocente as cod, correo, password as contraseña, estado, 'Docente' as tipo
            FROM docentes
            WHERE correo = ${email}
        `;

        if (resultado.rowCount === 0) {
            console.log("Correo no existe")
            return NextResponse.json({ error: 'Correo no encontrado' }, { status: 404 });
        }
        
        const compracion = await bcrypt.compare(password, resultado.rows[0].contraseña)
        if (compracion == false) {
            return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 404 });
        }
        if(!resultado.rows[0].estado){
            return NextResponse.json({ error: 'Usuario dado de baja' }, { status: 404 });
        }
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            email: email,
            tipo: resultado.rows[0].tipo
        }, process.env.SECRET_WORD_USER);



        const serialized = serialize('MyTokenUser', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: '/'
        });

        const response = NextResponse.json({ message: "Entro a la funcion" });
        response.headers.set('Set-Cookie', serialized);
        return response;

    } catch (error) {
        console.error("Error en el POST:", error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}