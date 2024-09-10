import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    console.log("Obtener datos usuario")
    const { rows: usuarios } =
      await sql`select * from estudiantes where correo = ${params.correo} ;  `;
    //console.log(usuarios)    
    if (usuarios.length > 0) {
      return NextResponse.json({ usuarios }, { status: 200 });
    } else {
      return NextResponse.json({ error: "estudiante no encontro" }, { status: 404 });
    }

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

