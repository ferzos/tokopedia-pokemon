import React from 'react';
import { Grid, Icon, Label, IconProps } from 'semantic-ui-react';
import { css } from '@emotion/react';
import Template from './Template';

type Props = {
  text?: string
  icon?: IconProps['icon']
}

const ErrorState = (props: Props) => {
  const {
    text = `Pikachu's thunderbolt has paralyzed the system. Please check again later.`,
    icon
  } = props

  return (
    <Template>
      <div css={styles.absoluteCentered}>
        <Grid css={styles.gridContainer}>
          <Grid.Column textAlign="center" verticalAlign="middle">
            <Grid.Row>
              <Grid.Column>
                <Icon name={icon || 'lightning'} inverted size='huge' />
              </Grid.Column>
            </Grid.Row>
            <br />
            <Grid.Row>
              <Grid.Column>
                <Label size='big' color='red'>{text}</Label>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    </Template>
  );
};

const styles = {
  absoluteCentered: css`
    position: fixed;
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