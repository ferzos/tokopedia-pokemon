import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { NextPageContext } from 'next';
import { Card, Grid, Icon, Label, List, Pagination, PaginationProps } from 'semantic-ui-react';
import Image from 'next/image'
import { useRouter } from "next/router";
import { css } from '@emotion/react';
import Link from 'next/link'

import { getNumOfPokemonOwned, isOwned, toTitleCase } from '../../utils/string';
import { ErrorState, Loader } from '../../components';
import Template from '../template';

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        name
        image
      }
    }
  }
`;

export type GetPokemon = {
  pokemons: {
    results: {
      name: string,
      image: string
    }[],
    count: number
  }
}

const OFFSET = 21

const generateVariables = (page: number) => ({
  limit: OFFSET,
  offset: (page - 1) * OFFSET
})

type Props = {
  page: number
}

const PokemonList = (props: Props) => {
  const { page } = props
  const variables = generateVariables(page)
  const { loading, error, data } = useQuery<GetPokemon>(GET_POKEMONS, {
    variables
  });
  const router = useRouter()

  const handlePageChange = (_: React.MouseEvent<HTMLAnchorElement, MouseEvent>, { activePage }: PaginationProps) => {
    router.push({
      pathname: '/list/[page]',
      query: { page: activePage },
    })
  }

  if (loading) return <Loader text={`Fetching Pokedex data from Prof. Oak's lab`} />

  if (error || data?.pokemons.results.length === 0) return <ErrorState />

  if (data && data.pokemons) {
    const { totalOwn, totalOwnUnique, totalOwnPageRelative } = getNumOfPokemonOwned(data.pokemons.results)
    return (
      <Template>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Label color='red'>
                {`You owned: `}
                <br/>
                <List bulleted>
                  <List.Item>{`${totalOwn} pokemon in total`}</List.Item>
                  <List.Item>{`${totalOwnUnique} unique pokemon`}</List.Item>
                  <List.Item>{`${totalOwnPageRelative} pokemon in this page`}</List.Item>
                </List>
              </Label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            {data.pokemons.results.map(({ image, name }) => (
              <Grid.Column css={styles.column} >
                <Link
                  href={{
                    pathname: '/detail/[pokemon]',
                    query: { pokemon: name },
                  }}
                >
                  <Card fluid>
                    <Card.Header textAlign={'right'}>
                      <Icon name='star' inverted color={isOwned(name) ? 'yellow' : 'black'} />
                    </Card.Header>
                    <Image src={image} alt={name} width={250} height={250} />
                    <Card.Description>
                      <Label basic size='tiny' css={styles.label} color='black'>{toTitleCase(name)}</Label>
                    </Card.Description>
                  </Card>
                </Link>
              </Grid.Column>
            ))}
          </Grid.Row>
          <Grid.Row columns={1}>
            <Pagination
              activePage={page}
              totalPages={Math.floor(data.pokemons.count / 20) - 1}
              prevItem={null}
              nextItem={null}
              size='mini'
              onPageChange={handlePageChange}
              css={styles.pagination}
            />
          </Grid.Row>
        </Grid>
      </Template>
    )
  }

  return null
};

const styles = {
  column: css`
    margin-bottom: 16px !important;
  `,
  pagination: css`
    margin: 0px auto 48px auto !important;
  `,
  label: css`
    width: 100%;
    text-align: center;
  `
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { page } = ctx.query;

  return {
    props: { page }
  }
}

export default PokemonList;