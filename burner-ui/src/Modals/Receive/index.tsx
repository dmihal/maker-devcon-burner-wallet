import React, { Component } from 'react';
import { withBurner, BurnerContext } from '../../BurnerProvider';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link
} from 'react-router-dom';
import { Flex, Button } from 'rimble-ui';
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
  defaultAccount: any;
  token: string;
  props: any;
}

type StateProps = {
  amount: number;
  token: string;
  update: any;
};

const NewTabs = ({ location }) => (
  <Tabs>
    <Tab to='/receive/custom' location={location}>
      Custom
    </Tab>
    <Tab location={location} to='/receive'>
      Address
    </Tab>
  </Tabs>
);

class ReceiveModal extends Component<AddressQrModalProps, StateProps> {
  constructor(props: AddressQrModalProps) {
    super(props);
    this.state = {
      amount: 0,
      token: 'xDai',
      update: 'no'
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

  componentDidUpdate(prevProps) {
    () => this.setState({ update: 'yes' });
  }

  render() {
    const bottomButtons = (location, amount, token) => (
      <Flex width={1} pt={16}>
        {/* Persist close button */}
        <Button as={Link} to='/' style={{ width: '30%' }}>
          Close
        </Button>
        {/* Switch between next/done */}
        <Switch>
          <Route
            path='/receive/custom/'
            exact
            render={() => (
              <Button
                as={Link}
                to={`/receive/custom/${amount}/${token}`}
                style={{ flex: 1, marginLeft: 'var(--page-margin)' }}
                children='Next'
              />
            )}
          />
          <Route
            path='/receive/custom/:amount/:token'
            exact
            render={() => (
              <Button
                as={Link}
                to='/'
                style={{ flex: 1, marginLeft: 'var(--page-margin)' }}
              >
                Done
              </Button>
            )}
          />
        </Switch>
      </Flex>
    );

    return (
      <ModalBackdrop>
        <ModalCard title='Receive' backTo={this.showBack(this.props.location)}>
          <NewTabs location={this.props.location} />
          <Switch>
            {/* switch between children with exact={true} */}
            <Route path='/receive' exact component={AddressOnly} />
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
              path='/receive/custom/:amount/:token'
              exact
              component={CustomRequestQr}
            />
          </Switch>
        </ModalCard>
        {bottomButtons(
          this.props.location,
          this.state.amount,
          this.state.token
        )}
      </ModalBackdrop>
    );
  }
}

// @ts-ignore withBurner causes ts issues. Try to cut it for routing etc, and instead only use it for account information.
export default withRouter(withBurner(ReceiveModal));
