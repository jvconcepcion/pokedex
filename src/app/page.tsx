"use client";
import {
  Select,
  PokeCard,
  NavButton,
} from "@/components";
import usePokedex from "@/hooks/usePokedex";

export default function Home() {
  const {
    pokemonList,
    disablePrev,
    disableNext,
    pokemon,
    loading,
    handlePrev,
    handleNext,
    handleSelect
  } = usePokedex();

  return (
    <main className="bg-[#E6EEFA] min-h-screen flex flex-col justify-center items-center py-10">
      <div className="w-full max-w-xs px-2">
        <Select
          pokemonList={pokemonList}
          selected={pokemon.name}
          onChange={handleSelect}
          loading={loading}
        />
        <PokeCard
          name={pokemon.name}
          imageUrl={pokemon.imageUrl}
          description={pokemon.description}
          loading={loading}
        />
        <NavButton
          onPrev={handlePrev}
          onNext={handleNext}
          disablePrev={disablePrev}
          disableNext={disableNext}
          loading={loading}
        />
      </div>
    </main>
  );
}
