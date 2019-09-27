import React, { Component } from 'react';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import {
  Box,
  Card,
  Flex,
  // Text,
  Tooltip,
  Button,
  Icon,
  Input,
  QR,
  Portal
} from 'rimble-ui';
import Sending from './Sending';
import Receiving from './Receiving';

const Overlay = styled(Box)`
  & {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: column;
    place-items: center;
    place-content: center;
  }
`;

interface ModalProps {
  history: any;
  location: any;
  match: any;
}

class Modal extends Component<ModalProps> {
  constructor(props: ModalProps) {
    super(props);
    const { location, history, match } = props;
    const isOpen = location.pathname == '/send' || '/Receive';
  }

  render() {
    console.log(location);
    const isOpen = location.pathname == '/send';
    return (
      <Portal>
        {location.pathname == '/send' ? (
          <Overlay>
            <Sending />
          </Overlay>
        ) : (
          location.pathname == '/receive' && (
            <Overlay>
              <Receiving />
            </Overlay>
          )
        )}
      </Portal>
    );
  }
}

export default withRouter(Modal);
