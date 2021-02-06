import { css } from "@emotion/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Input, InputOnChangeData, Label, Modal } from "semantic-ui-react";
import Image from 'next/image'

import { addToPokemonList } from "../utils/storage";

type SuccessCatchModalProps = {
  pokemon: {
    name: string,
    image: string
  }
  setOpen: Dispatch<SetStateAction<boolean>>
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
      const isSuccess = addToPokemonList({ name, image, nick: input })
      if (isSuccess) {
        setIsError(undefined)
        setOpen(false)
      } else {
        setIsError('SAME_NAME')
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

  const handleCloseModal = () => setOpen(false)

  const handleRetry = () => setIsLoading(true)

  return (
    <Modal
      onClose={handleCloseModal}
      onOpen={handleOpenModal}
      open={open}
      trigger={
        <div css={styles.extraInfo}>
          {'Catch!'}
          <Image src={'/pokeball.png'} alt={'pokeball'} width={24} height={24} />
        </div>
      }
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