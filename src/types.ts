export interface SelectProps {
  pokemonList: { name: string; url: string }[];
  selected: string;
  onChange: (value: string) => void;
  loading: boolean;
};

export interface PokeCardProps {
  name: string;
  imageUrl: string;
  description: string;
  loading: boolean;
};

export interface NavButtonProps {
  onPrev: () => void;
  onNext: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  loading: boolean;
};