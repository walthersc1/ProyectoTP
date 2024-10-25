import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request) {
    try {
        const datos = await request.json()
        //console.log(datos)
        try {
            const resultado = await
                sql`select correo, codestudiante as codigo ,'Estudiante' as rol from estudiantes
                where correo = ${datos.correo}
                and codestudiante = ${datos.codigo}
                union all 
                select correo, coddocente as codigo,'Docente' as rol from docentes 
                where correo = ${datos.correo}
                and coddocente =  ${datos.codigo}`

            if (resultado.rowCount === 0) {
                return NextResponse.json({ error: 'Correo o código no existe' }, { status: 405 });
            }
            return NextResponse.json({ mensaje: "se valido que exite correo y codigo", dataQuery: resultado.rows[0] }, { status: 200 })
        } catch (e) {
            console.error("Error al enviar el correo:", e); // Imprime el error
            return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ error: "Token no valido" }, { status: 500 })
    }
}