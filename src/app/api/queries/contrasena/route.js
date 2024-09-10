import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function PUT(request) {
  try {
    const datos = await request.json()

    const resultado =
      await sql`select * from estudiantes where correo = ${datos.correo} ;  `;

    const compracion = await bcrypt.compare(datos.ConstActual, resultado.rows[0].contraseña)
    if (compracion) {
      const hashedPassword = await bcrypt.hash(datos.ConstNueva, parseInt(process.env.saltRounds));
      await sql`update estudiantes
                set 
                contraseña = ${hashedPassword}
                where
                idestudiante = ${datos.idestudiante}`
      return NextResponse.json({ message: "Se cambio la contraseña de manera satisfactoria" }, { status: 200 })
    } else {
      return NextResponse.json({ message: "La contraseña Actual ingresada es incorrecta" }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}