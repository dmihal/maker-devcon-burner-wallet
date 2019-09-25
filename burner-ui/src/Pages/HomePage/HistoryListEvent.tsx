import React, { Fragment } from 'react';
import injectSheet from 'react-jss';
import { Asset } from '@burner-wallet/assets';
import HistoryEvent from '@burner-wallet/core/HistoryEvent';
import PluginElements, {
  PluginElementsProps
} from '../../components/PluginElements';
import { Flex } from 'rimble-ui';
import styled from 'styled-components';

import Text from '../../components/Text';

const HistoryPluginElements = PluginElements as React.FC<
  PluginElementsProps & { event: HistoryEvent }
>;

const FlexRow = styled(Flex)`
  border-top: 1px solid #f2f2f2;
`;

interface HistoryListEventProps {
  event: HistoryEvent;
  account?: string;
  navigateTo: (path: string) => void;
}

const HistoryListEvent: React.FC<HistoryListEventProps> = ({
  event,
  account,
  navigateTo
}) => {
  let type;
  const asset = event.getAsset();
  if (!asset) {
    console.warn(`Could not find asset ${event.asset}`);
    return null;
  }

  switch (event.type) {
    case 'send':
      return (
        <FlexRow
          justifyContent='space-between'
          onClick={() => navigateTo(`/receipt/${asset.id}/${event.tx}`)}
          pt={16}
          pb={16}
        >
          <div>
            <Text level={3} as={'span'}>
              {event.to.substring(0, 8)} ...{' '}
              {event.to.substring(event.to.length - 8, event.to.length)}
            </Text>
            <Text level={4} as={'div'}>
              {event.to === account ? 'Received funds' : 'Sent funds'}
            </Text>
          </div>

          <div>
            <Text level={3} as={'div'} right>
              {event.to === account ? '\u2199  ' : '\u2197  '}
              {parseFloat(asset.getDisplayValue(event.value)).toFixed(2)}
            </Text>
            <Text level={4} right as={'div'}>
              {asset.name}
            </Text>
            {/* <Text level={3} as={'div'}>
              {event.message && event.message.length > 0 && event.message}
            </Text> */}
          </div>
        </FlexRow>
      );
    case 'exchange':
      type = 'Exchange';
      break;
    default:
      console.warn('Unknown event type', event.type);
  }
};

export default HistoryListEvent;
