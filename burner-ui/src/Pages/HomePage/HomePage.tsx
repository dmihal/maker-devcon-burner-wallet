import React, { useRef, useEffect, Component, useState } from 'react';
import { Link } from 'react-router-dom';

import { BurnerContext, withBurner } from '../../BurnerProvider';
import Button from '../../components/Button';
import Page from '../../components/Page';
import styled from 'styled-components';
// import ActionRow from '../../components/ActionRow';
import { Box } from 'rimble-ui';
import PluginElements from '../../components/PluginElements';
import History from '../../data-providers/History';
import BalanceRow from '../../components/BalanceRow';
import HistoryListEvent from './HistoryListEvent';
import { L1, L2 } from '../../components/Text';
import BottomActions from '../../components/BottomActions';

const PositionedBottomActions = styled(BottomActions)`
  position: absolute;
  bottom: 32px;
  left: 0;
  right: 0;
`;

interface HomeButtonProps {
  path: string;
  title: string;
  classes: any;
}

const HomeButton: React.FC<HomeButtonProps> = ({ path, title, classes }) => (
  <li className={classes.buttonContainer}>
    <Button to={path} className={classes.homeButton}>
      {title}
    </Button>
  </li>
);

interface HomePageProps {
  defaultAccount;
  actions;
  assets;
  pluginData;
  classes;
  accounts;
}

class HomePage extends Component<BurnerContext & HomePageProps, any> {
  constructor(props: BurnerContext & HomePageProps) {
    super(props);
  }
  render() {
    return (
      <Page title={'My Wallet'}>
        <PluginElements position='home-top' />
        <BalanceRow accounts={this.props.accounts} assets={this.props.assets} />
        <PluginElements position='home-middle' />
        <Box margin='0 var(--page-margin)'>
          <L2 level={2} as={'h2'} margin={0}>
            Recent activity
          </L2>

          <History
            account={this.props.defaultAccount}
            render={(events: any[]) =>
              events.map(event => (
                <HistoryListEvent
                  key={JSON.stringify(event)}
                  event={event}
                  account={this.props.defaultAccount}
                  navigateTo={this.props.actions.navigateTo}
                />
              ))
            }
          />
        </Box>
        <Box margin='0 var(--page-margin)'>
          <Link to='/advanced'>Advanced</Link>
        </Box>
        <PositionedBottomActions
          actions={this.props.actions}
          pluginData={this.props.pluginData}
          defaultAccount={this.props.defaultAccount}
        />
      </Page>
    );
  }
}

export default withBurner(HomePage);
