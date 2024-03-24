export interface PokeList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeData[];
}

export interface PokeData {
  name: string;
  url: string;
}

export interface PokeCard {
  name: string;
  id: number;
  height: number;
  weight: number;
}
