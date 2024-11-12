import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
  const conection = sql;

      const datos2 =
      await conection`
      select e.idestudiante,
      e.nombre,
      e.apellido,
      e.numtelefono,
      e.edad,
      e.correo,
      e.codestudiante,
      e.codcarrera,
      e.fechanacimiento,
      e.fechacreacion,
      e.estado,
      e.genero,
      e.contraseña, c.carrera from estudiantes e
      join carrera c on c.idcarrera = e.codcarrera 
      where e.correo = ${params.correo}; `;
    console.log(datos2.rows[0])
    if (Object.keys(datos2.rows[0]).length > 0) {
      return NextResponse.json(datos2.rows[0]);
    } else {
      return NextResponse.json({ error: "estudiante no encontro" }, { status: 404 });
    }

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}