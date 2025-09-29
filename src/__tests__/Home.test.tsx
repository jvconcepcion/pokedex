
import Home from "@/app/page";
import { render } from "@testing-library/react";
import { SelectProps, PokeCardProps, NavButtonProps } from "@/types";

declare global {
  var selectProps: SelectProps;
  var pokeCardProps: PokeCardProps;
  var navButtonProps: NavButtonProps;
}

// Mock child components to capture their props
jest.mock("@/components/Select", () => () => <div data-testid="select-mock" />)
jest.mock("@/components/PokeCard", () => () => <div data-testid="pokecard-mock" />)
jest.mock("@/components/NavButton", () => () => <div data-testid="navbutton-mock" />)
// Mock the usePokedex hook
jest.mock("@/hooks/usePokedex", () => () => ({
  pokemonList: [],
  pokemon: { name: "", imageUrl: "", description: "" },
  disablePrev: true,
  disableNext: false,
  loading: false,
  handlePrev: jest.fn(),
  handleNext: jest.fn(),
  handleSelect: jest.fn(),
}))

describe("Home Page", () => {
  it("renders the select, Pokemon card, and description", () => {
    render(<Home />)
    // Check if the components are rendered
    expect(document.querySelector("[data-testid='select-mock']")).toBeInTheDocument()
    expect(document.querySelector("[data-testid='pokecard-mock']")).toBeInTheDocument()
    expect(document.querySelector("[data-testid='navbutton-mock']")).toBeInTheDocument()
  });
});