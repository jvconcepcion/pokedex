import { useState, useEffect, useCallback } from "react";
import { getPokemonSpriteUrl } from "@/lib/utils";
import { PokemonListArraySchema } from "@/lib/schemas";

export default function usePokedex() {
  const [pokemonList, setPokemonList] = useState<{ name: string, url: string }[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pokemon, setPokemon] = useState<{ name: string, imageUrl: string, description: string }>({
    name: "",
    imageUrl: "",
    description: ""
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch Pokemon list
  useEffect(() => {
    setLoading(true);
    fetch("/api/pokemon-list")
      .then(res => res.json())
      .then(data => {
        const result = PokemonListArraySchema.safeParse(data);
        if (result.success) {
          setPokemonList(result.data);
        } else {
          console.error("Invalid Pokemon list data:", result.error);
          setPokemonList([]);
        }
      })
      .finally(() => setLoading(false))
  }, []);

  // Fetch selected Pokemon details
  useEffect(() => {
    if (!pokemonList.length) return
    setLoading(true);
    const name = pokemonList[selectedIndex].name
    const id = selectedIndex + 1
    fetch(`/api/pokemon-description?id=${id}`)
      .then(res => res.json())
      .then(desc => {
        setPokemon({
          name,
          imageUrl: getPokemonSpriteUrl(id),
          description: desc.description
        });
      })
      .finally(() => setLoading(false))
  }, [pokemonList, selectedIndex]);

  const handlePrev = useCallback(() => setSelectedIndex(i => Math.max(i - 1, 0)), []);
  const handleNext = useCallback(() => setSelectedIndex(i => Math.min(i + 1, pokemonList.length - 1)), [pokemonList.length]);
  const handleSelect = useCallback((name: string) => setSelectedIndex(pokemonList.findIndex(p => p.name === name)), [pokemonList]);

  const disablePrev = selectedIndex === 0;
  const disableNext = selectedIndex === pokemonList.length - 1;

  return {
    pokemonList,
    disablePrev,
    disableNext,
    pokemon,
    loading,
    handlePrev,
    handleNext,
    handleSelect
  }
};