import React, { useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import Button from '../../components/Button';
import Page from '../../components/Page';
import LineItem from '../../components/LineItem';
import { Flex, Box, Card} from 'rimble-ui';
import Text from '../../components/Text';
import QRCode from 'qrcode.react';
import TransactionDetails from '../../data-providers/TransactionDetails';
import BalanceItem from '../../components/BalanceItem';
import { Link } from '../../components/Button';

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

const BottomButtonContainer = styled(Flex)`
  position: fixed;
  bottom: 24px;
  color: #000;
  font-weight: 600;
  left: var(--page-margin);
  right: var(--page-margin);
`;


const ConfirmPage: React.FC<BurnerContext & RouteComponentProps> = ({
  history,
  assets,
  actions,
  pluginData
}) => {
  if (!history.location.state) {
    history.replace('/send');
    return null;
  }

  const [sending, setSending] = useState(false);

  const {
    to,
    from,
    ether,
    value,
    asset: assetId,
    message,
    id
  } = history.location.state;
  const [asset] = assets.filter(a => a.id === assetId);

  const amount = ether || asset.getDisplayValue(value);

  const send = async () => {
    setSending(true);
    try {
      actions.setLoading('Sending...');
      const receipt = await asset.send({ from, to, ether, value, message });

      actions.setLoading(null);
      const redirect = pluginData.sent({
        asset,
        from,
        to,
        ether: amount,
        message,
        receipt,
        hash: receipt.transactionHash,
        id,
      });

      history.push(
        redirect || `/receipt/${asset.id}/${receipt.transactionHash}`
      );
    } catch (err) {
      setSending(false);
      console.error(err);
    }
  };

  return (
    <Page title='Confirm' back>

      <Box mt={24} padding='0 var(--page-margin)' as='section'>
        <Flex flexWrap={'wrap'} flexDirection="column">
          <Text level={4} margin={'0'}>From:</Text>
          <LineItem value={from}>
            { /*
            {tx.from.substring(0, 8)} ...{' '}
            {tx.from.substring(tx.from.length - 8, tx.from.length)}
            */ }
          </LineItem>
          <Text level={3} margin={'0'}>To:</Text>
          <LineItem value={to}>
            { /*
            {tx.to.substring(0, 8)} ...{' '}
            {tx.to.substring(tx.to.length - 8, tx.to.length)}
            */ }
          </LineItem>
          <Text level={3} margin={'0'}>Date:</Text>
          <LineItem>#######</LineItem>
        </Flex>
        <Box mt={24}>
          <Text level={2} as={'h2'}>
            Sending
          </Text>
          <Card borderRadius={2} width={'240px'}>
           <LineItem value={`${amount}`} />
            <LineItem value={`${asset.name}`} />

          </Card>
          { /* Copied over from Receipt Page.
            <BalanceItem
              asset={{ name: tx.assetName }}
              balance={tx.displayValue}
            />{' '}
             */}
        </Box>
        <Box mt={24}>
            <Text level={2} as={'h2'}>
              Message
            </Text>
            <Text level={3} as='div'>
              {message && <LineItem name='Message' value={message} />}
            </Text>
          </Box>
        </Box>

        <Flex mt={2}>
          <BottomButtonContainer>
            <Button disabled={sending} onClick={send} width={'100%'}>
              Send
            </Button>
          </BottomButtonContainer>
        </Flex>

    </Page>
  );
};

export default withBurner(ConfirmPage);
