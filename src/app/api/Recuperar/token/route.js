import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';

export async function POST(request) {
    try {

        const datos = await request.json()
        const compracion = await bcrypt.compare(datos.token, datos.tokenHas)
        console.log(compracion)
        if (compracion) {
            return NextResponse.json({ message: "Conforme" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Error" }, { status: 200 });
        }
    } catch (ex) {
        return NextResponse.json({ error: ex }, { status: 400 });
    }

}
export async function PUT(request) {
    try {
        const datos = await request.json()
        const hashedPassword = await bcrypt.hash(datos.ConstNueva, parseInt(process.env.saltRounds));
         await sql`update estudiantes
                set 
                contraseña = ${hashedPassword}
                where
                codestudiante = ${datos.codigo}
                and correo = ${datos.correo}`
                return NextResponse.json({ message: "Se actualizo la contraseña de manera correcta",datosLogin:{correo:datos.correo,contra:datos.ConstNueva} }, { status: 200 })
    } catch (ex) {
        return NextResponse.json({ error: "Se actualizo la contraseña de manera correcta" }, { status: 505 })

    }
}