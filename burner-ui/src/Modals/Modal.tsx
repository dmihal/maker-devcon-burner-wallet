import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Portal } from 'rimble-ui';

import ModalWrapper from './ModalWrapper';
import Sending from './Sending';
import Receive from './Receive';

interface ModalProps {
  history: any;
  location: any;
  match: any;
  close: Function;
}

class Modal extends Component<ModalProps> {
  constructor(props: ModalProps) {
    super(props);
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
          <ModalWrapper
            title='Send'
            rootPath='/'
            location='/send'
            history={history}
            close
            next={{ location: '/send/:amount/address', text: 'Next' }}
          >
            <Sending history={history} />
          </ModalWrapper>
        ) : (
          location.pathname == '/receive' && (
            <ModalWrapper
              title='Receive'
              rootPath='/'
              location='/receive'
              history={history}
              close
              next={{ location: '/receive/address', text: 'Next' }}
            >
              {/* to do: add real address */}
              <Receive address='0x12202020202020' history={history} />
            </ModalWrapper>
          )
        )}
      </Portal>
    );
  }
}

export default withRouter(Modal);
