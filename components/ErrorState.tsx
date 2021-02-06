import React from 'react';
import { Grid, Icon, Label } from 'semantic-ui-react';
import { css } from '@emotion/react';

type Props = {
  text?: string
}

const ErrorState = ({ text }: Props) => {
  return (
    <div css={styles.absoluteCentered}>
      <Grid css={styles.gridContainer}>
        <Grid.Column textAlign="center" verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Icon name='lightning' inverted size='huge' />
            </Grid.Column>
          </Grid.Row>
          <br/>
          <Grid.Row>
            <Grid.Column>
              <Label size='big' color='red'>{text || `Pikachu's thunderbolt has paralyzed the system. Please check again later.`}</Label>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const styles = {
  absoluteCentered: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `,
  gridContainer: css`
    height: 100%
  `
}

export default ErrorState