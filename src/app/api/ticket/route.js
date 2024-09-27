import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';
import next from "next";

export async function POST(req) {
    try {

        const dataInput = await req.json()
        console.log(dataInput)
        let tipoUsuario;
        let idUsuario;
        if(dataInput.iddocente){
            console.log("Entro a docente")
            tipoUsuario = "docente"
            idUsuario = dataInput.iddocente
        }else if(dataInput.idestudiante){
            console.log("Entro a estudiante")
             tipoUsuario = "estudiante"
             idUsuario = dataInput.idestudiante    
        }else{
            NextResponse.json({message:"Tipo de usuario no encontrado"},{status:404})
        }
        console.log("Dato tipo usuario: " + tipoUsuario)
        const datosOutput= await sql`select * from tickets
            where tipousuario =${tipoUsuario}
            and idusuario = ${idUsuario}`

        if(datosOutput.rows.length > 0){
            console.log("si hay datos")
            return NextResponse.json(datosOutput.rows)
        }else{
            console.log("no hay datos")
            return NextResponse.json("No se tickets registrados",{status:201})
        }

    } catch (error) {
        return NextResponse.json({ error: "Token no valido" }, { status: 500 })
    }
}