import { css } from "@emotion/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Input, InputOnChangeData, Label, Modal } from "semantic-ui-react";
import Image from 'next/image'

import { MY_POKEMON } from "../constants";

type SuccessCatchModalProps = {
  pokemon: {
    name: string,
    image: string
  }
  setOpen: Dispatch<SetStateAction<boolean>>
}

type MyPokemon = {
  name: string,
  nick: string,
  image: string
}

type ErrorType = 'EMPTY' | 'SAME_NAME'

const SuccessCatchModal = (props: SuccessCatchModalProps) => {
  const { pokemon: { name, image }, setOpen } = props
  const [isError, setIsError] = useState<ErrorType>();
  const [input, setInput] = useState<string>('');

  const handleInputChange = (_: React.ChangeEvent<HTMLInputElement>, { value }: InputOnChangeData) => {
    setInput(value)
    setIsError(undefined)
  }

  const handleSubmit = () => {
    if (input.trim() === '') {
      setIsError('EMPTY') 
    } else {
      const myPokemons = localStorage.getItem(MY_POKEMON)
  
      if (myPokemons) {
        const myPokemonList: MyPokemon[] = JSON.parse(myPokemons)
        const pokemonWithSameName = myPokemonList.find(({ nick }: MyPokemon) => nick === input)
  
        if (pokemonWithSameName) {
          setIsError('SAME_NAME')
        } else {
          localStorage.setItem(MY_POKEMON, JSON.stringify([...myPokemonList, { name, image, nick: input }]))
          setIsError(undefined)
          setOpen(false)
        }
      } else {
        localStorage.setItem(MY_POKEMON, JSON.stringify([{ name, image, nick: input }]))
        setIsError(undefined)
        setOpen(false)
      }
    }
  }

  return (
    <>
      <Modal.Content>
        <Label size='big'>{`Successfully catched ${name}!`}</Label>
        <br />
        <br />
        <Input placeholder='Enter nickname...' onChange={handleInputChange} input={input} error={!!isError} />
        {isError && <Label basic color='red' pointing>{isError === 'SAME_NAME' ? `You've already got a pokemon named ${input}` : `Can't insert empty nickname`}</Label>}
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={handleSubmit}>
          {'Submit'}
        </Button>
      </Modal.Actions>
    </>
  )
}

type Props = {
  pokemon: {
    name: string,
    image: string
  }
}

const CatchModal = (props: Props) => {
  const { pokemon } = props
  const [open, setOpen] = useState<boolean>(false);
  const [isCatched, setIsCatched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      setIsCatched(Math.floor(Math.random() * 10) % 2 === 0)
    }
  }, [open]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsCatched(Math.floor(Math.random() * 10) % 2 === 0)
        setIsLoading(false)
      }, 500)
    }
  }, [isLoading]);

  const handleOpenModal = () => setOpen(true)

  const handleRetry = () => setIsLoading(true)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<div css={styles.extraInfo} onClick={handleOpenModal}>
        {'Catch!'}
        <Image src={'https://lh3.googleusercontent.com/proxy/1TRDSQ1hld7KA_X2Lq3_N8lv9XFt-mTX0KNa_wBs17AS4FuzTg09eT7-9AdLN4ofz6D_0nCDUToz_eQ7pL03dlD4pEAkDNLii-d82zrpGVCtgcGe6uRWz9GNmo6MQVzrCQ'} alt={'pokeball'} width={24} height={24} />
      </div>}
    >
      {isCatched ? <SuccessCatchModal pokemon={pokemon} setOpen={setOpen} /> : (
        <>
          <Modal.Content>
            <Label size='big'>{`Oh no... the pokemon has run away.`}</Label>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={handleRetry} loading={isLoading}>
              {'Retry'}
            </Button>
          </Modal.Actions>
        </>
      )}
    </Modal>
  )
}

const styles = {
  extraInfo: css`
    display: flex;
    align-items: center;
    flex-direction: row-reverse
  `
}

export default CatchModal