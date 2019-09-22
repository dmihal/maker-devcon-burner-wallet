import React from 'react';
import { Link } from 'react-router-dom';

import { BurnerContext, withBurner } from '../../BurnerProvider';
import Button from '../../components/Button';
import Page from '../../components/Page';
import styled from 'styled-components';
// import ActionRow from '../../components/ActionRow';
import { Card, Box, Flex } from 'rimble-ui';
import PluginElements from '../../components/PluginElements';
import History from '../../data-providers/History';
import BalanceRow from '../../components/BalanceRow';
import HistoryListEvent from './HistoryListEvent';
import { L1, L2 } from '../../components/Text';
import BottomActions from '../../components/BottomActions';

const PositionedBottomActions = styled(BottomActions)`
  position: fixed;
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

const HomePage: React.FC<BurnerContext & { classes: any }> = ({
  defaultAccount,
  actions,
  assets,
  pluginData,
  classes,
}) => (
  <Page title={'My Wallet'}>
    <PluginElements position='home-top' />
    <BalanceRow account={defaultAccount} assets={assets} />
    <PluginElements position='home-middle' />

    <Box margin='0 var(--page-margin)'>
      <L2 level={2} as={'h2'} margin={0}>
        Recent Activity
      </L2>

      <History
        account={defaultAccount}
        render={(events: any[]) =>
          events.map(event => (
            <HistoryListEvent
              key={JSON.stringify(event)}
              event={event}
              account={defaultAccount}
              navigateTo={actions.navigateTo}
            />
          ))
        }
      />
    </Box>

    <PluginElements position='home-bottom' />
    <Box margin='0 var(--page-margin)'>
      <Link to='/advanced'>Advanced</Link>
    </Box>

    <PositionedBottomActions
      actions={actions}
      pluginData={pluginData}
      defaultAccount={defaultAccount}
    />
  </Page>
);

export default withBurner(HomePage);
