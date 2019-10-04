import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HistoryEvent from '@burner-wallet/core/HistoryEvent';
import { Box, Flex } from 'rimble-ui';

import { BurnerContext, withBurner } from '../../BurnerProvider';
import Button from '../../components/Button';
import Page from '../../components/Page';
// import ActionRow from '../../components/ActionRow';
import PluginButtons from '../../components/PluginButtons';
import PluginElements from '../../components/PluginElements';
import History from '../../data-providers/History';
import BalanceRow from '../../components/BalanceRow';
import HistoryListEvent from '../../components/HistoryListEvent';
import Text from '../../components/Text';
import BottomActions from '../../components/BottomActions';
import AppButton from './AppButton';

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

interface HomePageProps {
  defaultAccount;
  actions;
  assets;
  pluginData;
  classes;
  accounts;
}

const TabButton = styled.button`
  background: ${(props) => (props.selected ? 'var(--color-primary)' : 'var(--color-tertiary)')};
  border-radius: 30px;
  display: flex;
  font-size: 16px;
  align-items: center;
  color: ${(props) => (props.selected ? 'var(--color-tertiary)' : 'var(--color-primary)')};
  padding: 8px 12px;
  border: none;
  outline: none;
  margin: 0 4px;
  transition: 0.15s ease-in-out;

  &:first-child {
    margin-left: 0px;
  }
`;

const HomePage: React.FC<BurnerContext> = ({ defaultAccount, actions, pluginData }) => {
  const [tab, setTab] = useState(0);

  const homeTabs = [
    { Component: BalanceRow, plugin: null, options: { title: 'Cash' } },
    ...(pluginData.elements['home-tab'] || []),
  ];
  const { Component: TabComponent, plugin: tabPlugin } = homeTabs[tab];

  return (
    <StyledPage title="My Wallet">
      <PluginElements position="home-top" />

      <Box margin="0 var(--page-margin)">
        <Flex justifyContent="space-between" alignItems="center" my={2}>
          <Flex>
            {homeTabs.map(({ options }: PluginElementData, i: number) => (
              <TabButton key={options.title} onClick={() => setTab(i)} selected={tab === i}>
                {options.title}
              </TabButton>
            ))}
          </Flex>
        </Flex>
      </Box>

      <TabComponent plugin={tabPlugin} />

      <PluginElements position="home-middle" />
      <Box margin="0 var(--page-margin)">
        <Flex justifyContent="space-between" alignItems="center" my={2}>
          <Text level={2} as="h2" margin={0}>
            Recent activity
          </Text>
          <ViewAllButton to="/activity">View All</ViewAllButton>
        </Flex>

        <History
          account={defaultAccount}
          render={(events: HistoryEvent[]) => events.slice(0, 3).map((event: HistoryEvent) => (
            <HistoryListEvent
              key={JSON.stringify(event)}
              event={event}
              account={defaultAccount}
              navigateTo={actions.navigateTo}
            />
          ))}
        />
      </Box>
      <Box margin="0 var(--page-margin)">
        <Flex justifyContent="space-between" alignItems="center" my={2} pb={3} borderBottom={'1px solid #f2f2f2'}>
          <Text level={2} as="h2" margin={0}>
            Apps
          </Text>
        </Flex>

        <PluginButtons position="apps" component={AppButton} />

        <PluginButtons position="home" component={({ path, title }) => <Link to={path} style={{display:'block'}}>{title}</Link>} />
        <Link to="/advanced">Advanced</Link>
      </Box>
      <PositionedBottomActions
        actions={actions}
        pluginData={pluginData}
        defaultAccount={defaultAccount}
      />
    </StyledPage>
  );
};

export default withBurner(HomePage);
