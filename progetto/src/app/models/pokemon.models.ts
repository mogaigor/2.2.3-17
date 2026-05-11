// Modello per un tipo di pokemon (es: fire, water, grass)
export interface PokemonType {
  name: string;
  url: string;
}

// Risposta dell'API /type
export interface TypesResponse {
  count: number;
  results: PokemonType[];
}

// Singolo pokemon nella lista di un tipo
export interface PokemonEntry {
  name: string;
  url: string;
}

// Risposta dell'API /type/:name
export interface TypeDetailResponse {
  name: string;
  pokemon: { pokemon: PokemonEntry }[];
}

// Sprite del pokemon
export interface PokemonSprites {
  front_default: string;
  back_default: string;
}

// Singola statistica
export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

// Singolo tipo del pokemon
export interface PokemonTypeSlot {
  type: { name: string };
}

// Modello completo per la pagina dettaglio
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonTypeSlot[];
}