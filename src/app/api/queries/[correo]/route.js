import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    console.log("Obtener datos usuariossss")
    console.log(params.correo)
    const datos =
      await sql`select  *  from estudiantes where correo = ${params.correo} ;  `;
    if (Object.keys(datos.rows[0]).length > 0) {
      return NextResponse.json(datos.rows[0]);
    } else {
      return NextResponse.json({ error: "estudiante no encontro" }, { status: 404 });
    }

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}