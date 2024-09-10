import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function PUT(req, { params }) {
  try {

    const datos = await req.json();
    console.log(datos)
    const hashedPassword = await bcrypt.hash(datos.password, parseInt(process.env.saltRounds));
    var checkEmailQuery = 0;
    checkEmailQuery = await sql`SELECT COUNT(*) FROM docentes WHERE correo = ${datos.email}`


    if (checkEmailQuery.rows[0].count > 0) {
      console.log("Correo ya existe")
      return NextResponse.json({error: "ya existe un usuario registrado con este correo"},{status:404});
    }

    await sql`
          INSERT INTO docentes (nombre, apellido,numtelefono,edad,correo, coddocente,fechanacimiento,password)
          values (  ${datos.nombre} , ${datos.apellido},${datos.numtelefono},${datos.edad},${datos.email},${datos.coddocente},${datos.fechanacimiento}, ${hashedPassword});
          `;

    //const compracion = await bcrypt.compare(datos.password,hashedPassword)

    return NextResponse.json({mesage:"Se inserto correctamnete ga - 200"},{status:200});//usuarios
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}


