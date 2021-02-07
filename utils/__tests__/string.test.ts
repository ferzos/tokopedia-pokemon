import { isOwned } from './../string';
import { getNumOfPokemonOwned, toTitleCase } from '../string'

jest.spyOn(window.localStorage.__proto__, 'getItem');
window.localStorage.__proto__.getItem = () => '[{"name":"Pansear","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/513.png","nick":"wukong"},{"name":"Venusaur","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png","nick":"kaze"},{"name":"Venusaur","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png","nick":"bouken"},{"name":"Venusaur","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png","nick":"venus"},{"name":"Venusaur","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png","nick":"venus2"},{"name":"Necrozma-dusk","image":"/pokeball.png","nick":"malam-malam aku sendiri"}]'

describe('toTitleCase', () => {
  it('should show empty string', () => {
    expect(toTitleCase('')).toEqual('')
  })
  it('should show empty string', () => {
    expect(toTitleCase('lorem')).toEqual('Lorem')
  })
  it('should show empty string', () => {
    expect(toTitleCase('lorem ipsum')).toEqual('Lorem ipsum')
  })
  it('should show empty string', () => {
    expect(toTitleCase('Lorem ipsum dolor sit amet')).toEqual('Lorem ipsum dolor sit amet')
  })
})

describe('isOwned', () => {
  it('should return false', () => {
    expect(isOwned('bulbasaur')).toBeFalsy()
  })

  it('should return true', () => {
    expect(isOwned('venusaur')).toBeTruthy()
  })
})

describe('getNumOfPokemonOwned', () => {
  it('should return correct object', () => {
    const API_RESPONSE_MOCK = [{
      name: 'bulbasaur',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
    }, {
      name: 'ivysaur',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png'
    }, {
      name: 'venusaur',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'
    }, {
      name: 'charmander',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
    }, {
      name: 'charmeleon',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png'
    }, {
      name: 'charizard',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
    }, {
      name: 'squirtle',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
    }, {
      name: 'wartortle',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png'
    }, {
      name: 'blastoise',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png'
    }, {
      name: 'caterpie',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png'
    }, {
      name: 'metapod',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png'
    }, {
      name: 'butterfree',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png'
    }, {
      name: 'weedle',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png'
    }, {
      name: 'kakuna',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png'
    }, {
      name: 'beedrill',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png'
    }, {
      name: 'pidgey',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png'
    }, {
      name: 'pidgeotto',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png'
    }, {
      name: 'pidgeot',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png'
    }, {
      name: 'rattata',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png'
    }, {
      name: 'raticate',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png'
    }, {
      name: 'spearow',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png'
    }]
    expect(getNumOfPokemonOwned(API_RESPONSE_MOCK)).toEqual({
      totalOwn: 6,
      totalOwnUnique: 3,
      totalOwnPageRelative: 1
    })
  })

  it('should return all zero', () => {
    window.localStorage.__proto__.getItem = () => null
    expect(getNumOfPokemonOwned([])).toEqual({
      totalOwn: 0,
      totalOwnUnique: 0,
      totalOwnPageRelative: 0
    })
  })
})

