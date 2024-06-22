import { sql } from '@vercel/postgres';
import { compareSync } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
    try {
        console.log("Entro a la query")
        const datos = await req.json();
        console.log(datos)
        const values = [];
        let contador = 0;


        let consulta = `
            select coddocente, 
            ( nombre || ' ' || apellido) as nombre, 
            ( horainicio || ' - ' || horafin ) as Horario,
            sede 
            from docentes `;

        if (datos.sede) {
            contador += 1;
            consulta += " where lower(sede) = lower($" + contador + ") ";
            values.push(datos.sede);
        }
        if (datos.nombre) {
            contador += 1;
            if (contador > 1) {
                consulta += "and lower(nombre || ' ' || apellido) LIKE lower($" + contador + ")";
            } else {
                consulta += "where lower(nombre || ' ' || apellido) LIKE lower($" + contador + ")";
            }
            values.push(`%${datos.nombre}%`);
        }
        if (datos.codigo) {
            contador += 1;
            if (contador > 1) {
                consulta += "and lower(coddocente) LIKE lower($" + contador + ")";
            } else {
                consulta += "where lower(coddocente) LIKE lower($" + contador + ")";
            }
            values.push(`%${datos.codigo}%`);
        }
        console.log("creo bien la query")
        console.log(consulta)
        const res = await sql.query(consulta, values);
        const dataset = res.rows;
        return NextResponse.json(dataset);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}