import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

const Template = (props: PropsWithChildren<{}>) => {
  const { children } = props
  const router = useRouter()

  const handleClick = (path: string) => () => router.push(path)
  
  return (
    <>
      <div css={styles.paddedContainer}>
        {children}
      </div>
      <Menu fluid fixed='bottom'>
        <Menu.Item
          name='Pokemon List'
          active={router.pathname.includes('list')}
          onClick={handleClick('/list/1')}
        >
          <Icon name='list' />
          {'Pokemon List'}
        </Menu.Item>
        <Menu.Item
          name='My Pokemon'
          active={router.pathname.includes('my')}
          onClick={handleClick('/my')}
        >
          <Icon name='user' />
          {'My Pokemon'}
        </Menu.Item>
      </Menu>
    </>
  );
};

const styles = {
  paddedContainer: css`
    padding: 8px 16px;
  `,
}

export default Template;