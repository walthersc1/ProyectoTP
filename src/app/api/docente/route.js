import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req, { params }) {
  try {

    const datos = await req.json();
    console.log(datos)
    const hashedPassword = await bcrypt.hash(datos.password, parseInt(process.env.saltRounds));
    var checkEmailQuery = 0;
    checkEmailQuery = await sql`select count(*) from estudiantes e, docentes d
    where e.correo = ${datos.correo}
    or d.correo = ${datos.correo}`

    //  const compracion = await bcrypt.compare(datos.password,hashedPassword)

    if (checkEmailQuery.rows[0].count > 0) {
      return NextResponse.json({error: "ya existe un usuario registrado con este correo"},{status:404});
    }

    await sql`
          INSERT INTO docentes (nombre, apellido,numtelefono,edad,correo, coddocente,fechanacimiento,password)
          values (  ${datos.nombre} , ${datos.apellido},${datos.numtelefono},${datos.edad},${datos.email},${datos.coddocente},${datos.fechanacimiento}, ${hashedPassword});
          `;


    return NextResponse.json({mesage:"Se inserto correctamnete ga - 200"},{status:200});//usuarios
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const datos = await request.json()

    const resultado =
      await sql`select * from docentes where correo = ${datos.correo} ;  `;

    const compracion = await bcrypt.compare(datos.ConstActual, resultado.rows[0].password)
    if (compracion) {
      const hashedPassword = await bcrypt.hash(datos.ConstNueva, parseInt(process.env.saltRounds));
      await sql`update docentes
                set 
                password = ${hashedPassword}
                where
                iddocente = ${datos.iddocente}`
      return NextResponse.json({ message: "Se cambio la contraseña de manera satisfactoria" }, { status: 200 })
    } else {
      return NextResponse.json({ message: "La contraseña Actual ingresada es incorrecta" }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

