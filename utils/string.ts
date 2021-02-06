import intersectionWith from "lodash/intersectionWith";
import uniqBy from "lodash/uniqBy";

import { GetPokemon } from './../pages/list/[page]';
import { getMyPokemonList } from "./storage"

export const toTitleCase = (text: string) => {
  const [firstChar, ...rest] = text

  return [firstChar.toUpperCase(), ...rest].join('')
}

export const getNumOfPokemonOwned = (results: GetPokemon['pokemons']['results']) => {
  const myPokemonList = getMyPokemonList()

  if (myPokemonList) {
    const uniqueOwnedPokemon = uniqBy(myPokemonList, 'name')
    return {
      totalOwn: myPokemonList.length,
      totalOwnUnique:uniqueOwnedPokemon.length,
      totalOwnPageRelative: intersectionWith(results, uniqueOwnedPokemon, ({ name: nameA }, { name: nameB }) => nameA.toLowerCase() === nameB.toLowerCase()).length
    }
  }

  return {
    totalOwn: 0,
    totalOwnUnique: 0,
    totalOwnPageRelative: 0
  }
}

export const isOwned = (pokemonName: string) => {
  const myPokemonList = getMyPokemonList()

  if (myPokemonList) {
    return myPokemonList.find(({ name }) => name.toLowerCase() === pokemonName.toLowerCase())
  }

  return 0
}