import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {

    const datos =
      await sql`select idcarrera, carrera from carrera ;  `;

    return NextResponse.json({ datos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}