import React from "react";
import { SelectProps } from "@/types";
import { TiArrowSortedDown } from "react-icons/ti";

const Select: React.FC<SelectProps> = ({
  pokemonList,
  selected,
  onChange,
  loading
}) => {
  return (
<div className="relative w-full mb-4">
  <select
    value={selected}
    onChange={e => onChange(e.target.value)}
    disabled={loading}
    className="w-full pl-4 pr-10 py-2 border border-[#5e5e96] rounded-lg bg-white text-lg shadow focus:outline-none focus:ring-2 focus:ring-[#5e5e96] cursor-pointer appearance-none"
  >
    {loading
      ? <option>Loading...</option>
      : pokemonList.map(pokemon => (
          <option key={pokemon.name} value={pokemon.name}>
            {pokemon.name}
          </option>
        ))
    }
  </select>
  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl">
    <TiArrowSortedDown />
  </span>
</div>
  )
}

export default Select
