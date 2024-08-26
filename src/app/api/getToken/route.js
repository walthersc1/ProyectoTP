import { NextResponse } from "next/server";
import { jwtVerify } from 'jose'

export async function GET(req) {
    try {

        const cookieHeader = req.cookies.get('MyTokenUser')

        if (cookieHeader) {
            const { payload } = await jwtVerify(cookieHeader.value, new TextEncoder().encode(process.env.SECRET_WORD_USER))
        
            return NextResponse.json(payload)
        } else {
            return NextResponse.json("")
        }
    } catch (error) {
        return NextResponse.json({error:"Token no valido"},{status:500})
    }
}
