import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
    try {
        const datos = await req.json();

        const nCitas = await sql`select count(*) as nCitasHoy
            from cita
            where iddocente = ${datos.iddocente}
            and fecha = CURRENT_DATE`;

        const nPasientes =
            await sql`select COUNT(DISTINCT idestudiante) as nPasientes
            from cita
            where iddocente = ${datos.iddocente}`;

        const fechaCita = await
            sql`select TO_CHAR(fecha, 'DD/MM/YYYY') || ' de ' || horainicio || ' a '|| horafin as fecha_hora from cita
                where iddocente = ${datos.iddocente}
                and fecha >= CURRENT_DATE
                order by fecha,horainicio asc
                limit 1`;

        const responseArray = [
            { CantidadCitas: nCitas.rows[0].ncitashoy },
            { CantidadPacientes: nPasientes.rows[0].npasientes},
            { fechaCita: fechaCita.rows[0]?.fecha_hora || 'No hay citas programadas' }
        ];
        return NextResponse.json(responseArray);


    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}