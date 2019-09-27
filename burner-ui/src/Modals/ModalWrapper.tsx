import React, { Component } from 'react';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Box } from 'rimble-ui';

import {
  TransactionCard,
  TransactionCardHeader,
  TransactionCardBody,
  TransactionCardFooter
} from '../components/TransactionCard';
import Text from '../components/Text';

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

const Bottom = styled.div`
  margin-top: var(--page-margin);
`;

const ModalWrapper: React.FC<{
  title: string;
  bottomActions?: any;
  // bottomActions?: boolean;
}> = ({ title, children, bottomActions }) => {
  const BottomActions = bottomActions;
  return (
    <ModalBackdrop>
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
          <Text level={1} as={'h1'} left margin='0'>
            {title}
          </Text>
        </TransactionCardHeader>
        <TransactionCardBody>{children}</TransactionCardBody>
      </TransactionCard>
      {bottomActions && (
        <Bottom>
          <BottomActions />
        </Bottom>
      )}
    </ModalBackdrop>
  );
};

export default ModalWrapper;
