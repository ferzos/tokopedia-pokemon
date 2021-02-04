import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

const TestPage = () => {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: {
      limit: 2,
      offset: 1,
    },
  });

  if (data) {
    return (
      <div>
        {JSON.stringify(data)}
      </div>
    );
  }

  return null
};

export default TestPage;