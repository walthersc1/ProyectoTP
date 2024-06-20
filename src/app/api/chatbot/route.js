import { sql } from '@vercel/postgres'; // Ajusta esta importación según tu configuración de PostgreSQL y Next.js
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
    try {
 
        const datos = await req.json();
 
         await sql`
        INSERT INTO resultado (
            gradodepresion, 
            idestudiante, 
            respuesta1, 
            respuesta2, 
            respuesta3, 
            respuesta4, 
            respuesta5, 
            respuesta6, 
            respuesta7, 
            respuesta8, 
            respuesta9, 
            fechacreacion
        ) VALUES (
            ${datos.gradodepresion},
            ${datos.idestudiante},
            ${datos.respuesta1},
            ${datos.respuesta2},
            ${datos.respuesta3},
            ${datos.respuesta4},
            ${datos.respuesta5},
            ${datos.respuesta6},
            ${datos.respuesta7},
            ${datos.respuesta8},
            ${datos.respuesta9},
            CURRENT_DATE
        ) RETURNING *;
        `;

        return NextResponse.json("Se realizo la consulta bien - 200");
    } catch (error) {
        console.error("Error en el POST:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
