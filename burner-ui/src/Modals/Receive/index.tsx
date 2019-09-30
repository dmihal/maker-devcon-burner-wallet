import React, { Component } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect,
  Link
} from 'react-router-dom';
import { Box, Flex, Tooltip, Button, Icon, Input, QR } from 'rimble-ui';
import { ModalBackdrop, ModalCard } from '../Modal';

import Tabs, { Tab } from '../../components/Tabs';

import AddressOnly from './AddressOnly';
import CustomRequestAmount from './CustomRequestAmount';
import CustomRequestQr from './CustomRequestQr';

interface AddressQrModalProps {
  address: string;
  location: any;
  showBack?: boolean;
  match?;
  history?;
  amount?: number | null;
}

const CloseButton = styled(Button)`
  /* width: 30%; */
`;

const MainButton = styled(Button)`
  /* flex: 1; */
`;

const NewTabs = ({ location }) => (
  <Tabs>
    <Tab to='/receive/custom' location={location}>
      Custom
    </Tab>
    <Tab location={location} to='/receive/address'>
      Address
    </Tab>
  </Tabs>
);

const BottomButtons = ({ location }) => (
  <Flex width={1} pt={16}>
    {/* Persist close button */}
    <Button as={Link} to='/' style={{ width: '30%' }}>
      Close
    </Button>
    {/* Switch between next/done */}
    {location.pathname == '/receive/custom' ? (
      <Button
        as={Link}
        to='/receive/custom/qr'
        style={{ flex: 1, marginLeft: 'var(--page-margin)' }}
      >
        {' '}
        Next
      </Button>
    ) : (
      location.pathname == '/receive/custom/qr' && (
        <Button
          as={Link}
          to='/'
          style={{ flex: 1, marginLeft: 'var(--page-margin)' }}
        >
          Done
        </Button>
      )
    )}
  </Flex>
);

class ReceiveModal extends Component<AddressQrModalProps> {
  constructor(props: AddressQrModalProps) {
    super(props);
    this.state = {
      amount: 0
    };
  }

  handleValue = amount => {
    this.setState({
      amount: amount
    });
  };

  showBack = location => {
    if (location.pathname == '/receive/custom/qr') {
      return '/receive/custom';
    } else {
      return null;
    }
  };

  render() {
    return (
      <ModalBackdrop>
        <ModalCard title='receive' backTo={this.showBack(this.props.location)}>
          <NewTabs location={this.props.location} />
          <Switch>
            {/* switch between children with exact={true} */}
            <Route path='/receive/address' exact component={AddressOnly} />
            <Route
              path='/receive/custom'
              exact
              render={() => (
                <CustomRequestAmount
                  amount={this.state.amount}
                  updateValue={this.handleValue}
                />
              )}
            />
            <Route
              path='/receive/custom/qr'
              props
              exact
              render={() => (
                <CustomRequestQr
                  amount={this.state.amount}
                  address={'0x0000000000'}
                />
              )}
            />
          </Switch>
        </ModalCard>
        <BottomButtons location={this.props.location} />
      </ModalBackdrop>
    );
  }
}

export default withRouter(ReceiveModal);
