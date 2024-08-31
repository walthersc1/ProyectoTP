import { sql } from '@vercel/postgres';
import { compareSync } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
    try {
        const datos = await req.json();
        const values = [];
        let contador = 1;

        let consulta = `
            select idcita, 
            (d.nombre || ' ' || d.apellido) nombre,
            c.modalidad,
            c.lugar,
            c.horainicio,
            c.horafin,
            c.fecha
            from cita c inner join docentes d on c.iddocente = d.iddocente 
            inner join estudiantes e on e.idestudiante = c.idestudiante
            where e.codestudiante = $` + 1;

        values.push(datos.codigo);

        if (datos.codcita) {
            contador += 1;
            consulta += " and LOWER(c.idcita) = $" + contador + " ";
            values.push(datos.estado);
        }
        if (datos.nombre) {
            contador += 1;
            consulta += "and lower(d.nombre || ' ' || d.apellido) LIKE lower($" + contador + ")";
            values.push(`%${datos.nombre}%`);
        }
        if (datos.fecha) {
            contador += 1;
            consulta += "and c.fecha = $" + contador;
            values.push(datos.fecha);
        }

        const res = await sql.query(consulta, values);
        const dataset = res.rows;
        return NextResponse.json(dataset);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}