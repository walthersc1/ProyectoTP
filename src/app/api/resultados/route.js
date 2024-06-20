import { sql } from '@vercel/postgres';
import { compareSync } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
    try {
        console.log("Entro al post");
        const datos = await req.json();
        console.log(datos);
        let contador = 0;
        const values = [];

        let consulta = `
        SELECT e.codestudiante, (e.nombre || ' ' || e.apellido) AS nombre, r.idresultado,
         TO_CHAR(r.fechacreacion, 'DD/MM/YYYY') AS fechacreacion
         ,r.gradodepresion,e.edad 
        FROM resultado r
        INNER JOIN estudiantes e ON r.idestudiante = e.idestudiante `;

        // Agregar condiciones dinámicamente según los parámetros no nulos o vacíos
        if (datos.estado) {
            contador += 1;
            consulta += "where LOWER(r.gradodepresion) = LOWER($" + contador + ")";
            values.push(datos.estado);
        }
        if (datos.nombre) {
            contador += 1;
            if (contador > 1) {
                consulta += "and lower(e.nombre || ' ' || e.apellido) LIKE lower($" + contador + ")";
            } else {
                consulta += "where lower(e.nombre || ' ' || e.apellido) LIKE lower($" + contador + ")";
            }
            values.push(`%${datos.nombre}%`);
            console.log(values)
        }
        if (datos.codigo) {
            contador += 1;
            if (contador > 1) {
                consulta += "and e.codestudiante = $" + contador;
            } else {
                consulta += "where e.codestudiante = $" + contador;
            }
            values.push(datos.codigo);
        }
        //console.log(consulta)
        const res = await sql.query(consulta, values);
        const dataset = res.rows;

        return NextResponse.json(dataset);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
