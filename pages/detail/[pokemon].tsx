import React from 'react';
import { NextPageContext } from 'next';
import { gql, useQuery } from '@apollo/client';
import { Card, Grid, Header, Label, LabelProps } from 'semantic-ui-react';
import Image from 'next/image'
import { css } from '@emotion/react';

import { CatchModal, ErrorState, Loader } from '../../components';
import { toTitleCase } from '../../utils/string';
import Template from '../../components/Template';
import { PokemonDetailContext } from '../../hooks/context';

const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

type GetPokemonDetail = {
  pokemon: {
    name: string,
    sprites?: {
      front_default: string
    },
    types?: {
      type: {
        name: string
      }
    }[]
    moves?: {
      move: { name: string }
    }[]
  }
}

type Type =
  'normal' |
  'fire' |
  'fighting' |
  'water' |
  'flying' |
  'grass' |
  'poison' |
  'electric' |
  'ground' |
  'psychic' |
  'rock' |
  'ice' |
  'bug' |
  'dragon' |
  'ghost' |
  'dark' |
  'steel' |
  'fairy'

const TYPE_TO_COLOR: Record<Type, LabelProps['color']> = {
  bug: 'olive',
  dark: 'black',
  dragon: 'violet',
  electric: 'yellow',
  fairy: 'pink',
  fighting: 'red',
  fire: 'orange',
  flying: 'teal',
  ghost: 'violet',
  grass: 'green',
  ground: 'brown',
  ice: 'teal',
  normal: 'grey',
  poison: 'purple',
  psychic: 'pink',
  rock: 'brown',
  steel: 'grey',
  water: 'blue'
}

type Props = {
  pokemon: string
}

const PokemonDetail = (props: Props) => {
  const { pokemon } = props
  const { loading, error, data } = useQuery<GetPokemonDetail>(GET_POKEMON_DETAIL, {
    variables: { name: pokemon }
  });

  if (loading) return <Loader text={`Fetching Pokedex data from Prof. Oak's lab`} />

  if (error || !data?.pokemon.name) return <ErrorState />

  if (data?.pokemon.name) {
    const {
      sprites,
      name,
      types,
      moves
    } = data.pokemon

    return (
      <PokemonDetailContext.Provider value={{ image: sprites?.front_default || '/pokeball.png', name: toTitleCase(name) }}>
        <Template>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Card fluid>
                  <Image layout='responsive' src={sprites?.front_default || '/pokeball.png'} alt={pokemon} width={500} height={500} />
                  <Card.Content>
                    <Card.Header>{toTitleCase(name)}</Card.Header>
                    {types &&
                      <Card.Meta>
                        {types.map(({ type: { name } }) => <Label color={TYPE_TO_COLOR[name as Type]} >{toTitleCase(name)}</Label>)}
                      </Card.Meta>
                    }
                    <br />
                    <Card.Description>
                      <Header as='h4'>
                        {'Available Moves'}
                      </Header>
                      {moves &&
                        <div css={styles.horizontalScroll}>
                          {moves.map(({ move: { name } }) => name).sort().map((moveName) => <Label>{toTitleCase(moveName)}</Label>)}
                        </div>
                      }
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <CatchModal />
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Template>
      </PokemonDetailContext.Provider>
    );
  }

  return null
};

const styles = {
  horizontalScroll: css`
    display: flex;
    flex-direction: row;
    overflow-x: auto;
  `,
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { pokemon } = ctx.query;

  return {
    props: { pokemon }
  }
}

export default PokemonDetail;