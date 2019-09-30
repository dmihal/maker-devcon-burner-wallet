import React, { Component } from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import { Portal, Box, Icon } from 'rimble-ui';
import styled from 'styled-components';

import {
  TransactionCard,
  TransactionCardHeader,
  TransactionCardBody
} from '../components/TransactionCard';

import Text from '../components/Text';
import IconButton from '../components/IconButton';

import Send from './Send';
import Receive from './Receive';

const ModalBackdrop = styled(Box)`
  & {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    height: 100vh;
    width: 100vw;
    padding: var(--page-margin);
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-flow: column;
    place-items: center;
    place-content: center;
  }
`;

const ModalCard: React.FC<{
  title: string;
  children: React.ReactNode;
  backTo?: string | null;
}> = ({ title, children, backTo }) => (
  <TransactionCard
    bg='#FFF'
    color='#000'
    border={'none'}
    borderRadius={2}
    p={0}
    display={'flex'}
    flexDirection={'column'}
    justifyContent={'space-between'}
    flex={'1'}
  >
    <TransactionCardHeader>
      {backTo && backTo.length && <IconButton icon='back' to={backTo} />}
      <Text level={1} as={'h1'} left margin='0'>
        {title}
      </Text>
    </TransactionCardHeader>
    <TransactionCardBody>{children}</TransactionCardBody>
  </TransactionCard>
);

interface ModalProps {
  history: any;
  location: any;
  match: any;
}

class Modal extends Component<ModalProps> {
  constructor(props: ModalProps) {
    super(props);
  }

  render() {
    return (
      <Portal>
        <Switch>
          <Route exact path='/send' component={Send} />
          <Route exact path='/send/:to' component={Send} />
          <Route exact path='/send/:to/:amount/:token' component={Send} />
          <Route
            path='/receive'
            component={() => (
              <Receive address='0x12202020202020' history={history} />
            )}
          />
        </Switch>
      </Portal>
    );
  }
}

export { ModalCard, ModalBackdrop };
export default withRouter(Modal);
