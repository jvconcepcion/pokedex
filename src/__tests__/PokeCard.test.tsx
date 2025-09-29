import { render, screen } from "@testing-library/react";
import { PokeCard } from "@/components";

describe("PokeCard", () => {
  it("renders the Pokemon information", () => {
    render(
      <PokeCard
        name="Bulbasaur"
        imageUrl="/bulba.png"
        description="Seed Pokemon"
        loading={false}
      />
    );
    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("Seed Pokemon")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Bulbasaur" }).getAttribute("src")).toContain("bulba.png")
  });
});