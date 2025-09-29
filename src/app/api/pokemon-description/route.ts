import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "1";
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const pokemon = await res.json();
  const description = pokemon.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, " ");

  return NextResponse.json({ description });
};