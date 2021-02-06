import React, { useState } from 'react';
import { Button, Icon, Label, Modal } from 'semantic-ui-react';

type Props = {
  onRelease: () => void
}

const ReleaseModal = (props: Props) => {
  const { onRelease } = props
  const [open, setOpen] = useState<boolean>(false);

  const handleRelease = () => {
    onRelease()
    setOpen(false)
  }

  const handleCloseModal = () => setOpen(false)

  const handleOpenModal = () => setOpen(true)

  return (
    <Modal
      onClose={handleCloseModal}
      onOpen={handleOpenModal}
      open={open}
      trigger={<Icon name='close' />}
    >
      <Modal.Content>
        <Label size='big'>{`Are you sure to release this pokemon?`}</Label>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={handleCloseModal}>
          {'No'}
        </Button>
        <Button color='green' onClick={handleRelease}>
          {'Yes'}
        </Button>
      </Modal.Actions>
    </Modal>
  )

}

export default ReleaseModal