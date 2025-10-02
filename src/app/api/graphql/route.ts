import { NextRequest, NextResponse } from "next/server";
import { graphql, buildSchema } from "graphql";

const schema = buildSchema(`
  # pokemon-list response
  type Pokemon {
    name: String
    url: String
  }
  
  # pokemon-description response
  type PokemonDescription {
    description: String
  }
    
  # combined both responses
  type Query {
    pokemonList(limit: Int, offset: Int): [Pokemon]
    pokemonDescription(id: ID!): PokemonDescription
  }
`);

const rootValue = {
  // previous logic for `pokemon-list/route.ts`
  pokemonList: async ({ limit = 150, offset = 0 }: { limit?: number, offset?: number }) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
      const data = await response.json();
      
      return data.results;
    } catch (error) {
      console.error("Error in pokemonList resolver:", error);
      return [];
    }
  },

  // previous logic for  `pokemon-description/route.ts`
  pokemonDescription: async ({ id }: { id: string }) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
      const pokemon = await response.json();
      
      const englishEntry = pokemon.flavor_text_entries.find(
        (entry: any) => entry.language.name === "en"
      );
      
      const cleanedText = englishEntry 
        ? englishEntry.flavor_text.replace(/[\n\f]/g, " ") 
        : "No English description available.";
        
      return { description: cleanedText };

    } catch (error) {
      console.error(`Error in pokemonDescription resolver for ID ${id}:`, error);
      return { description: "Could not fetch description." };
    }
  },
};

export async function POST(req: NextRequest) {
  try {
    const { query, variables } = await req.json();
    const result = await graphql({
      schema,
      source: query,
      rootValue,
      variableValues: variables,
    });

    return NextResponse.json(result);

  } catch (error: any) {
    return NextResponse.json({ errors: [{ message: error.message }] }, { status: 500 });
  }
}