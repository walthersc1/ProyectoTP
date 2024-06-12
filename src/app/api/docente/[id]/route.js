import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {

    const { rows: usuarios } =
      await sql`select * from docentes where iddocente = ${params.id} ;  `;



    if (usuarios.length > 0) {
      return NextResponse.json({ usuarios }, { status: 200 });
    } else {
      return NextResponse.json({ error: "estudiante no encontro" }, { status: 404 });
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
        fechanacimiento = ${datos.fechanacimiento}
    WHERE
        iddocente = ${datos.iddocente};`

    return NextResponse.json("Se actualizo correctamnete - 200");
  } catch (error) {
    return NextResponse.error('Error: ' + error.message, 500);
  }
}


