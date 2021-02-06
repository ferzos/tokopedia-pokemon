export const MY_POKEMON = 'myPokemon'

export type MyPokemon = {
  name: string,
  nick: string,
  image: string
}

export const getMyPokemonList = (): MyPokemon[] | null => {
  const myPokemonList = localStorage.getItem(MY_POKEMON)

  if (myPokemonList) return JSON.parse(myPokemonList) as MyPokemon[]

  return null
}

export const addToPokemonList = (pokemon: MyPokemon): boolean => {
  const myPokemonList = getMyPokemonList()

  if (myPokemonList) {
    const pokemonWithSameName = myPokemonList.find(({ nick }: MyPokemon) => nick === pokemon.nick)

    if (pokemonWithSameName) return false

    localStorage.setItem(MY_POKEMON, JSON.stringify([...myPokemonList, pokemon]))

    return true
  }

  localStorage.setItem(MY_POKEMON, JSON.stringify([{ pokemon }]))

  return true
}

export const removeFromPokemonList = (pokemon: MyPokemon): MyPokemon[] => {
  const myPokemonList = getMyPokemonList()

  if (myPokemonList) {
    const newPokemonList = myPokemonList.filter(({ nick }) => nick !== pokemon.nick)
    localStorage.setItem(MY_POKEMON, JSON.stringify(newPokemonList))

    return newPokemonList
  }

  return []
}