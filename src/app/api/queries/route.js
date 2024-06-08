import { sql } from '@vercel/postgres';
import next from 'next';
import { NextResponse } from 'next/server';


export async function GET(request) {
  try {
    const { idCodigo } = await request.json();

    console.log(idCodigo);

    const { rows: usuarios } =
      await sql`select * from estudiantes ;  `;

    return NextResponse.json({ usuarios }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}


export async function PUT(request) {
  /*try {

    const { nombre, apellido, numtelefonico,
      edad, correo, codestudiante, codcarrera, fechanacimiento,
      fechacreacion, estado } = await request.json();

    await sql`
        INSERT INTO estudiantes (nombre, apellido,numtelefonico,edad,correo, codestudiante, codcarrera,fechanacimiento)
        values (  ${nombre} , ${apellido},${numtelefonico},${edad},${correo},${codestudiante},${codcarrera},${fechanacimiento});
        `;

    return NextResponse.json("Se inserto correctamnete - 200");//usuarios
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }*/

  return NextResponse.json("si entro")
}

export async function POST(req, { params }) {
  try {
    const datos = await req.json();
    console.log(datos);
    await sql`UPDATE estudiantes
    SET 
        nombre = ${datos.nombre},
        apellido = ${datos.apellido},
        numtelefono = ${datos.numtelefono},
        edad = ${datos.edad},
        correo = ${datos.correo},
        codcarrera = ${datos.codcarrera},
        fechanacimiento = ${datos.fechanacimiento}
    WHERE
      idestudiante = ${datos.idestudiante};`
      
    return NextResponse.json("Se actualizo correctamnete - 200");
  } catch (error) {
    return NextResponse.error('Error: ' + error.message, 500);
  }
}