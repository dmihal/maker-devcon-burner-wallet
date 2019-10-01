import React, { Component } from 'react';
import { Box, Card, Flex } from 'rimble-ui';
import styled from 'styled-components';
import ReceiveModal from '../../Modals/Receive';
import SendModal from '../../Modals/Send';
import Button, { Link } from '../../components/Button';
import { SCAN_QR_DATAURI } from '../../constants';

const ADDRESS_REGEX = /^(?:0x)?[0-9a-f]{40}$/i;
const PK_REGEX = /^(?:0x)?[0-9a-f]{64}$/i;

const ScanButton = styled(Button)`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 72px;
    width: 72px;
    border-radius: 50%;
    border: none;
    background-color: var(--color-primary);
    order: 3;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    z-index: 20;
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
      background: center no-repeat url("${SCAN_QR_DATAURI}");
      background-size: 60%;
      z-index:21;
    }
`;

// override default styles
const BottomButton = styled(Link)`
  color: var(--color-primary);
  background-color: transparent;
  width: calc((100% - 72px - 8px) / 2);
  font-size: 18px;
  z-index: 10;
  border: none;
  box-shadow: none;
  &:hover,
  &:focus,
  &:active {
    outline: none;
    background: transparent;
    box-shadow: none;
  }
  &:before {
    display: none;
  }
`;

// override default styles
// const BottomButton = styled(Button)`
//   color: var(--color-primary);
//   background-color: transparent;
//   width: calc((100% - 72px - 8px) / 2);
//   font-size: 18px;
//   z-index: 10;
//   border: none;
//   box-shadow: none;
//   &:hover,
//   &:focus,
//   &:active {
//     outline: none;
//     background: transparent;
//     box-shadow: none;
//   }
//   &:before {
//     display: none;
//   }
// `;

interface BottomActionsProps {
  actions: any;
  pluginData: any;
  defaultAccount: any;
  className?: string;
}

class BottomActions extends Component<BottomActionsProps> {
  constructor(props: BottomActionsProps) {
    super(props);
    this.state = {};
  }
  render() {
    const { actions, pluginData, defaultAccount, className } = this.props;

    return (
      <>
        <Box margin={'0 var(--page-margin)'} className={className}>
          <Card width='auto' padding={0} borderRadius={2}>
            <Flex justifyContent='space-between' alignItems='center'>
              <BottomButton as={Link} to='/receive' children='Receive' />
              <ScanButton as={Link} to='/scan' />
              <BottomButton as={Link} to='/send' children='Send' />
            </Flex>
          </Card>
          {pluginData.homeButtons.map(({ title, path }) => (
            <Link children={title} to={path} key={title} />
          ))}
        </Box>
      </>
    );
  }
}

export default BottomActions;
