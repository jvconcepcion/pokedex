import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=150");
  const data = await res.json();

  return NextResponse.json(data.results);
};