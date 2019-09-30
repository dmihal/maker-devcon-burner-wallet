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
}

const NewTabs = () => (
  <Tabs>
    <Tab to='/receive/custom' location={location}>
      Custom
    </Tab>
    <Tab location={location} to='/receive/address'>
      Address
    </Tab>
  </Tabs>
);

const BackButtons = () => <Link to='/' />;

class ReceiveModal extends Component<AddressQrModalProps> {
  constructor(props: AddressQrModalProps) {
    super(props);
    this.state = {
      showBack: false,
      backTo: '/receive/custom'
    };
  }

  showBack = location => {
    if (location.pathname == '/receive/qr') {
      return '/receive/custom';
    } else {
      return null;
    }
  };

  render() {
    const { address } = this.props;
    console.log(this.state);

    return (
      <ModalBackdrop>
        <ModalCard title='receive' backTo={this.showBack(this.props.location)}>
          <NewTabs location={location} />
          <Switch>
            {/* switch between children with exact={true} */}
            <Route path='/receive/address' exact component={AddressOnly} />
            <Route
              path='/receive/custom'
              exact
              component={CustomRequestAmount}
            />
            <Route path='/receive/qr' exact component={CustomRequestQr} />
          </Switch>
        </ModalCard>
        <Button as={Link} to='/'>
          Close
        </Button>
        {/* Second switch for buttons */}
        <Switch>
          {/* switch between children with exact={true} */}
          <Route
            path='/receive/custom'
            exact
            component={() => {
              return (
                <Button as={Link} to='/receive/qr'>
                  Next
                </Button>
              );
            }}
          />
          <Route
            path='/receive/receive/qr'
            exact
            component={() => (
              <Button as={Link} to='/'>
                Done
              </Button>
            )}
          />
        </Switch>
      </ModalBackdrop>
    );
  }
}

export default withRouter(ReceiveModal);
