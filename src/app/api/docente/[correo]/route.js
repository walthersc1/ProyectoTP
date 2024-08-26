import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { json } from 'body-parser';

export async function GET(request, { params }) {
  try {
    const { rows: psicologo } =
      await sql`select * from docentes where correo = ${params.correo} ;  `;
      
    if (psicologo.length > 0) {
      return NextResponse.json({ psicologo }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Error a encontrar la id del docente" }, { status: 404 });
    }

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {

    const datos = await req.json();
    console.log(datos);
    await sql`UPDATE docentes
    SET 
        nombre = ${datos.nombre},
        apellido = ${datos.apellido},
        numtelefono = ${datos.numtelefonico},
        edad = ${datos.edad},
        correo = ${datos.correo},
        coddocente = ${datos.coddocente},
        fechanacimiento = ${datos.fechanacimiento},
        horainicio = ${datos.horainicio},
        horafin = ${datos.horafin}
    WHERE
        iddocente = ${datos.iddocente};`

    return NextResponse.json("Se actualizo correctamnete - 200");
  } catch (error) {
    return NextResponse.error('Error: ' + error.message, 500);
  }
}


