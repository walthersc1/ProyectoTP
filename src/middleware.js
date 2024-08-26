import { NextResponse } from "next/server";
import { jwtVerify } from 'jose'
import {serialize} from "cookie"

export const config = {
    matcher: ['/InfoPersonal', '/Cantactar', '/Chatbot', '/Historial', '/Agenda', '/InfoPsicologo', '/Resultados', '/Dashboard', '/AgregarCita'],
}


export async function middleware(req) {
    console.log('Entrando a middle')
    const cookieHeader = req.cookies.get('MyTokenUser')
    const array_estudiante = ['/InfoPersonal', '/Cantactar', '/Chatbot', '/Historial', '/Agenda']
    const array_psicologo = ['/InfoPsicologo', '/Resultados', '/Dashboard', '/AgregarCita']
    const uriactual = req.nextUrl.pathname;



    if (cookieHeader === undefined) {
        return NextResponse.redirect(new URL('/Login', req.url))
    }


    try {

        const { payload } = await jwtVerify(cookieHeader.value, new TextEncoder().encode(process.env.SECRET_WORD_USER))

        if (payload.tipo == 'Estudiante') {
            if (array_psicologo.includes(uriactual)) {
                const redirectUrl = new URL("/", req.url);
                redirectUrl.searchParams.set("message", "No tienes acceso a esta ruta.");
                return NextResponse.redirect(redirectUrl);
            }

        }

        if (payload.tipo == 'Docente') {

            if (array_estudiante.includes(uriactual)) {
                const redirectUrl = new URL("/", req.url);
                redirectUrl.searchParams.set("message", "No tienes acceso a esta ruta.");
                return NextResponse.redirect(redirectUrl);
            }
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/Login', req.url))
    }

}
