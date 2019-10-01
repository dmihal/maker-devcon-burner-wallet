import React from 'react';
import styled from 'styled-components';
import HistoryEvent from '@burner-wallet/core/HistoryEvent';
import { Box } from 'rimble-ui';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import Page from '../../components/Page';
import History from '../../data-providers/History';
import HistoryListEvent from '../../components/HistoryListEvent';

const HistoryEventOnActivityPage = styled(HistoryListEvent)`
  &:first-child {
    border-top: 0px;
}
`

const ActivityPage: React.FC<BurnerContext> = ({ defaultAccount, actions }) => {
  return (
    <Page title="Activity" back>
      <Box padding="0 var(--page-margin)" as="section">
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
    </Page>
  );
};

export default withBurner(ActivityPage);
