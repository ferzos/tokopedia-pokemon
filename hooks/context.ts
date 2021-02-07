import { createContext } from "react"

/**
 * ======================
 * Pokemon Detail Context
 * ======================
 */
type PokemonDetailContext = { image: string, name: string }

export const PokemonDetailContext = createContext<PokemonDetailContext>(null!)
PokemonDetailContext.displayName = 'PokemonDetailContext'
// =================================================