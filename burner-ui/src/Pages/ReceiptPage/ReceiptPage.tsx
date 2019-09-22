import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import QRCode from 'qrcode.react';
import Page from '../../components/Page';
import LineItem from '../../components/LineItem';
import TransactionDetails from '../../data-providers/TransactionDetails';
import { Flex, Box } from 'rimble-ui';
import styled from 'styled-components';
import Text from '../../components/Text';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import BalanceItem from '../../components/BalanceItem';
import { Link } from '../../components/Button';

interface MatchParams {
  asset: string;
  txHash: string;
  account: string;
}

const MetaKey = styled(Text)`
  opacity: 0.6;
  width: 5.5ch;
  margin: 6px 0;
`;

const MetaValue = styled(Text)`
  flex: 1 0 calc(100% - 5.5ch);
  opacity: 0.6;
  margin: 6px 0;
`;

const BottomButton = styled(Link)`
  position: fixed;
  bottom: 24px;
  color: #000;
  font-weight: 600;
  left: var(--page-margin);
  right: var(--page-margin);
  border: 1px solid #ccc;
`;

const DefaultAccount: React.FC<BurnerContext & { classes: any }> = ({
  defaultAccount
}) => {
  return defaultAccount;
};

const GetAssets: React.FC<BurnerContext & { classes: any }> = ({ assets }) => {
  return assets;
};

const Assets = withBurner(GetAssets);
const Address = () => withBurner(DefaultAccount);

const ReceiptPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => (
  <Page title='Transaction' back>
    <TransactionDetails
      asset={match.params.asset}
      txHash={match.params.txHash}
      render={tx => {
        if (!tx) {
          return (
            <div>
              <div>Transaction not found...</div>
              <div>The transaction may still be propogating</div>
            </div>
          );
        }

        return (
          <Box mt={24} padding='0 var(--page-margin)' as='section'>
            <Flex flexWrap={'wrap'}>
              <MetaKey level={4}>From:</MetaKey>
              <MetaValue level={4}>
                {tx.from.substring(0, 8)} ...{' '}
                {tx.from.substring(tx.from.length - 8, tx.from.length)}
              </MetaValue>
              <MetaKey level={4}>To:</MetaKey>
              <MetaValue level={4}>
                {tx.to.substring(0, 8)} ...{' '}
                {tx.to.substring(tx.to.length - 8, tx.to.length)}
              </MetaValue>
              <MetaKey level={4}>Date:</MetaKey>
              <MetaValue level={4}>#######</MetaValue>
            </Flex>
            <Box mt={24}>
              <Text level={2} as={'h2'}>
                {Address === tx.from ? 'Sent' : 'Received'}
              </Text>
              <BalanceItem
                asset={{ name: tx.assetName }}
                balance={tx.displayValue}
              />{' '}
            </Box>
            <Box mt={24}>
              <Text level={2} as={'h2'}>
                Message
              </Text>
              <Text level={3} as='div'>
                Hello world
              </Text>
            </Box>
          </Box>
        );
      }}
    />
    <BottomButton outline to='/'>
      Back
    </BottomButton>
  </Page>
);

export default withBurner(ReceiptPage);
