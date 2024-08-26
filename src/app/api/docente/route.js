import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function PUT(req, { params }) {
  try {

    const datos = await req.json();
    //console.log(datos)
    const hashedPassword = await bcrypt.hash(datos.password, parseInt(process.env.saltRounds));
    var checkEmailQuery = 0;
    checkEmailQuery = await sql`SELECT COUNT(*) FROM docentes WHERE correo = ${datos.correo}`


    if (checkEmailQuery.rows[0].count > 0) {
      return NextResponse.json("ya existe un usuario registrado con este correo");
    }

    await sql`
          INSERT INTO docentes (nombre, apellido,numtelefono,edad,correo, coddocente,fechanacimiento,password)
          values (  ${datos.nombre} , ${datos.apellido},${datos.numtelefono},${datos.edad},${datos.correo},${datos.coddocente},${datos.fechanacimiento}, ${hashedPassword});
          `;

    //const compracion = await bcrypt.compare(datos.password,hashedPassword)

    return NextResponse.json("Se inserto correctamnete ga - 200");//usuarios
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}


