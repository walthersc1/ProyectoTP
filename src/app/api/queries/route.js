import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function GET(request) {
  try {
    const { idCodigo } = await request.json();

    console.log(idCodigo);

    const { rows: usuarios } =
      await sql`select * from estudiantes `;

    return NextResponse.json({ usuarios }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}


export async function PUT(request) {
  try {
    const datos = await request.json();

    const hashedPassword = await bcrypt.hash(datos.password, parseInt(process.env.saltRounds));
    var checkEmailQuery = 0;

    checkEmailQuery = await sql`SELECT COUNT(*) FROM estudiantes WHERE correo = ${datos.correo}`

    if (checkEmailQuery.rows[0].count > 0) {
      return NextResponse.json({ message: "ya existe un usuario registrado con este correo" }, { status: 500 });        
    }

    await sql`
      INSERT INTO estudiantes (nombre, apellido,numtelefono,edad,correo,codestudiante, codcarrera,fechanacimiento,contraseña)
      values (  ${datos.nombre} , ${datos.apellido},${datos.numtelefono},${datos.edad}, ${datos.correo},${datos.codestudiante},${datos.codcarrera} ,${datos.fechanacimiento},${hashedPassword});
      `;

    return NextResponse.json({ message: "Se creo la cuenta correctamente " }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
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
        fechanacimiento = ${datos.fechanacimiento},
        estado = ${datos.estado}
    WHERE
      idestudiante = ${datos.idestudiante};`
console.log("Sale de la query")
    return NextResponse.json("Se actualizo correctamnete - 200");
  } catch (error) {
    return NextResponse.error('Error: ' + error.message, 500);
  }
}