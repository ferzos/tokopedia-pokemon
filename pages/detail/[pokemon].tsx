import React from 'react';
import { NextPageContext } from 'next';
import { gql, useQuery } from '@apollo/client';
import { Card, Grid, Header, Label } from 'semantic-ui-react';
import Image from 'next/image'
import { css } from '@emotion/react';

import { ErrorState, Loader } from '../../components';
import { toTitleCase } from '../../utils/string';

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
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Card>
              {sprites?.front_default && <Image src={sprites.front_default} alt={pokemon} width={500} height={500} />}
              <Card.Content>
                <Card.Header>{toTitleCase(name)}</Card.Header>
                {types &&
                  <Card.Meta>
                    {types.map(({ type: { name } }) => <Label>{toTitleCase(name)}</Label>)}
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
                <div css={styles.extraInfo}>
                  {'Catch!'}
                  <Image src={'https://lh3.googleusercontent.com/proxy/1TRDSQ1hld7KA_X2Lq3_N8lv9XFt-mTX0KNa_wBs17AS4FuzTg09eT7-9AdLN4ofz6D_0nCDUToz_eQ7pL03dlD4pEAkDNLii-d82zrpGVCtgcGe6uRWz9GNmo6MQVzrCQ'} alt={'pokeball'} width={24} height={24} />
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
  extraInfo: css`
    display: flex;
    align-items: center;
    flex-direction: row-reverse
  `
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { pokemon } = ctx.query;

  return {
    props: { pokemon }
  }
}

export default PokemonDetail;