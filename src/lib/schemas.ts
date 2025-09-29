import { z } from "zod";

export const PokemonListSchema = z.object({
  name: z.string(),
  url: z.string()
});

export const PokemonListArraySchema = z.array(PokemonListSchema);

export const PokemonDescriptionSchema = z.object({
  description: z.string()
});