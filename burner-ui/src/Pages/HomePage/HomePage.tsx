import React, { useRef, useEffect, Component, useState } from 'react';
import { Link } from 'react-router-dom';

import { BurnerContext, withBurner } from '../../BurnerProvider';
import Button from '../../components/Button';
import Page from '../../components/Page';
import styled from 'styled-components';
// import ActionRow from '../../components/ActionRow';
import { Box, Flex, Card } from 'rimble-ui';
import PluginElements from '../../components/PluginElements';
import History from '../../data-providers/History';
import BalanceRow from '../../components/BalanceRow';
import HistoryListEvent from '../../components/HistoryListEvent';
import Text from '../../components/Text';
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

const StyledPage = styled(Page)`
  padding-bottom: 110px;
`;


const ViewAllButton = styled(Link)`
  background: #F2F2F2;
  border-radius: 30px;
  display: flex;
  align-items: center;
  color: #555;
  padding: 8px 12px;
  text-decoration: none;

  &:after {
    content: '\\203A';
    margin-left: 10px;
  }
`;

const AppCard = styled(Card)`
  display: flex;
  flex: 1;
  border-radius: 8px;
  padding: 16px;
  padding-right: 12px;
  margin: 8px 0px;
  font-weight: 400;
  align-items: center;
  &:not(:first-of-type) {
    margin-left: 12px;
  }
  & > span {
    display: block;
  }
`;

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
    const { accounts, defaultAccount, actions, pluginData, assets } = this.props;
    return (
      <StyledPage title={'My Wallet'}>
        <PluginElements position='home-top' />
        <BalanceRow accounts={accounts} assets={assets} />
        <PluginElements position='home-middle' />
        <Box margin='0 var(--page-margin)'>
          <Flex justifyContent={'space-between'} alignItems={'center'} my={2}>
            <Text level={2} as="h2" margin={0}>
              Recent activity
            </Text>
            <ViewAllButton to="/activity">View All</ViewAllButton>
          </Flex>
          <History
            account={defaultAccount}
            render={(events: any[]) =>
              events.slice(0, 3).map(event => (
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
        <Box margin='0 var(--page-margin)'>
        <AppCard>
              <Box width={'60%'}>
                <Text level={2} as={'h3'} margin={'0'} color={'#444'}>
                  Sablier
                </Text>
                <Text level={3} as={'p'} margin={'0'} textAlign={'left'} color={'#999'}>
                  Continuous payment streams you can access instantly.
                </Text>
              </Box>
                <Flex width={'40%'} flexDirection={'column'} alignItems={'center'}>
                  <Box borderRadius={100} width={'64px'} height={'64px'} backgroundColor={'#999999'}></Box>
                </Flex>
              </AppCard>
          <Link to='/advanced'>Advanced</Link>
        </Box>
        <PositionedBottomActions
          actions={actions}
          pluginData={pluginData}
          defaultAccount={defaultAccount}
        />
      </StyledPage>
    );
  }
}

export default withBurner(HomePage);
