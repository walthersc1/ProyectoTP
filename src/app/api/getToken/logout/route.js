import { NextResponse } from "next/server";
import { serialize } from "cookie"

export async function POST(req) {
    try {
        console.log("Entrado a logout aaaaa")
        const serialized = serialize('MyTokenUser', null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        });
        const response = NextResponse.json({ message: "Entro a la funcion" });
        response.headers.set('Set-Cookie', serialized);
        return response
    } catch (error) {
        return NextResponse.json({ error: "Token no valido" }, { status: 500 })
    }
}