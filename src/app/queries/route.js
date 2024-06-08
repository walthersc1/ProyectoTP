import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  try {
    
    const {rows:usuarios} =
    await sql`
    select * from Estudiante ;
    `;
    
    return NextResponse.json({ usuarios }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}


export async function POST(request) {
  try 
  {
  const {nombre, apellido, numtelefonico,
  edad, correo, codestudiante, codcarrera, fechanacimiento,  
  fechacreacion, estado} = await request.json();
    await sql`
    INSERT INTO Estudiante (nombre, apellido, numtelefonico, edad,
       correo, codestudiante, codcarrera, fechanacimiento, fechacreacion, estado)
    values (  ${nombre} , ${apellido} ,
     ${numtelefonico} ,  ${edad} , 
     ${correo} ,  ${codestudiante} , 
     ${codcarrera} ,  ${fechanacimiento} ,  
    ${fechacreacion} , ${estado} );
    `;
    
    return NextResponse.json({ usuarios }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}