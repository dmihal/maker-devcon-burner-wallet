import React, { Component } from 'react';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { Button, Portal } from 'rimble-ui';

import ModalWrapper from './ModalWrapper';
import Sending from './Sending';
import Receive from './Receive';

import Text from '../components/Text';

interface ModalProps {
  history: any;
  location: any;
  match: any;
}

class Modal extends Component<ModalProps> {
  constructor(props: ModalProps) {
    super(props);
    const { location, history, match } = props;
  }

  close = () => {
    this.props.history.go(-1);
  };

  render() {
    console.log(location);
    const isOpen = location.pathname == '/send';
    return (
      <Portal>
        {location.pathname == '/send' ? (
          <ModalWrapper title='Send'>
            <Sending />
          </ModalWrapper>
        ) : (
          location.pathname == '/receive' && (
            <ModalWrapper
              title='Receive'
              bottomActions={() => (
                <Button onClick={() => this.close()}>Close</Button>
              )}
            >
              <Receive address='0x12202020202020' />
            </ModalWrapper>
          )
        )}
      </Portal>
    );
  }
}

export default withRouter(Modal);
