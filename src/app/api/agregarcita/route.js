import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


export async function PUT(request) {
    try {
        const datos = await request.json();
        //console.log("Entrando al Put")
        const consulta = await sql`
        select idestudiante from estudiantes
        where codestudiante = ${datos.codestudiante};
        `;
        console.log(consulta.rows[0].idestudiante)

        await sql `
         INSERT INTO cita (fecha, iddocente, idestudiante, modalidad, lugar, horainicio, horafin)
            VALUES (${datos.fecha}, ${datos.iddocente}, ${consulta.rows[0].idestudiante}, ${datos.modalidad}, ${datos.lugar}, ${datos.horainicio}, ${datos.horafin})
        `;

        return NextResponse.json("200 - Se guardo con exito");
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}


export async function POST(req) {
    try {
        console.log("Entrando al post")
        const datos = await req.json();
        console.log(datos) 
        const consulta = await sql`
        select  e.codestudiante, (e.nombre || ' ' || e.apellido) nombre, c.modalidad, c.lugar, 
        c.horainicio,c.horafin  from cita c inner join estudiantes e on c.idestudiante = e.idestudiante
        where c.iddocente = ${datos.iddocente} 
        and c.fecha =  ${datos.fecha};
        `;
 
        return NextResponse.json(consulta.rows);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
