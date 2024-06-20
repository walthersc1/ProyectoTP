
import { sql } from '@vercel/postgres';
import { compareSync } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
    try {
        console.log("Entro al post");
        const datos = await req.json();
        //console.log(datos);
      

        const consulta = await sql`
        SELECT e.codestudiante, (e.nombre || ' ' || e.apellido) AS nombre,
         TO_CHAR(r.fechacreacion, 'DD/MM/YYYY') AS fechacreacion
         ,r.gradodepresion,
            r.respuesta1, 
            r.respuesta2, 
            r.respuesta3, 
            r.respuesta4, 
            r.respuesta5, 
            r.respuesta6, 
            r.respuesta7, 
            r.respuesta8, 
            r.respuesta9
        FROM resultado r
        INNER JOIN estudiantes e ON r.idestudiante = e.idestudiante 
        where e.codestudiante = ${datos.codestudiante}
        and r.idresultado = ${datos.idresultado}`;

        const respuestas = [
            consulta.rows[0].respuesta1,
            consulta.rows[0].respuesta2,
            consulta.rows[0].respuesta3,
            consulta.rows[0].respuesta4,
            consulta.rows[0].respuesta5,
            consulta.rows[0].respuesta6,
            consulta.rows[0].respuesta7,
            consulta.rows[0].respuesta8,
            consulta.rows[0].respuesta9,
          ];
        const resultado = {
            codestudiante: consulta.rows[0].codestudiante,
            nombre: consulta.rows[0].nombre,
            gradodepresion: consulta.rows[0].gradodepresion,
            fechacreacion: consulta.rows[0].fechacreacion,
            respuestas: respuestas,
        }
        return NextResponse.json(resultado);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}