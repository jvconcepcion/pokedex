import { fireEvent, render, screen } from "@testing-library/react";
import { Select } from "@/components";

describe("Select", () => {
  it("renders options and calls onChange", () => {
    const pokemonList = [
      { name: "Bulbasaur", url: "/bulbasaur" },
      { name: "Ivysaur", url: "/ivysaur" }
    ];
    const handleChange = jest.fn();
    render(
      <Select
        pokemonList={pokemonList}
        selected="Bulbasaur"
        onChange={handleChange}
        loading={false}
      />
    );
    expect(screen.getByRole("option", { name: "Bulbasaur" })).toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Ivysaur" } });
    expect(handleChange).toHaveBeenCalled();
  });
});