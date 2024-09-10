import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function PUT(request) {
  try {
    console.log("Entrando al put")
    const datos = await request.json()
    console.log(datos)

    const resultado =
      await sql`select * from estudiantes where correo = ${datos.correo} ;  `;
    console.log(resultado.rows[0])

    const compracion = await bcrypt.compare(datos.ConstActual, resultado.rows[0].contraseña)
    if(compracion){
      /*
      Crear query
      */ 
     return NextResponse.json({message:"Se cambio la contraseña de manera satisfactoria"},{status:200})
    }else{
      return NextResponse.json({message:"La contraseña Actual ingresada es incorrecta"},{status:404})
    }

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}