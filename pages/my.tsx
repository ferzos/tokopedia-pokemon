import React, { useEffect, useState } from 'react';
import { Card, Grid, Label } from 'semantic-ui-react';
import Image from 'next/image'
import { css } from '@emotion/react';

import { ErrorState, ReleaseModal } from '../components';
import { getMyPokemonList, MyPokemon, removeFromPokemonList } from '../utils/storage';
import { toTitleCase } from '../utils/string';
import Template from './template';

const MyPokemonPage = () => {
  const [myPokemonList, setMyPokemonList] = useState<MyPokemon[] | null>();

  useEffect(() => {
    const myPokemonList = getMyPokemonList()
    setMyPokemonList(myPokemonList)
  }, []);

  const handleRelease = (pokemon: MyPokemon) => () => {
    const newPokemonList = removeFromPokemonList(pokemon)
    setMyPokemonList(newPokemonList)
  }

  if (myPokemonList?.length) {
    return (
      <Template>
        <Grid>
          <Grid.Row columns={3}>
            {myPokemonList.map((myPokemon) => (
              <Grid.Column css={styles.column}>
                <Card fluid>
                  <Card.Header textAlign='right'>
                    <ReleaseModal onRelease={handleRelease(myPokemon)} />
                  </Card.Header>
                  <Image src={myPokemon.image} alt={myPokemon.name} width={250} height={250} />
                  <Card.Description>
                    <Label basic size='tiny' css={styles.label} color='black'>{`${toTitleCase(myPokemon.name)}\n(${myPokemon.nick})`}</Label>
                  </Card.Description>
                </Card>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Template>
    )
  }

  return <ErrorState text={`Oh no, You haven't catch any pokemon. Go to Pokemon List to start catching!`} icon='battery empty' />
};

const styles = {
  column: css`
    margin-bottom: 16px !important;
  `,
  label: css`
    width: 100%;
    text-align: center;
  `
}

export default MyPokemonPage;