import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import Button from '../../components/Button';
import Page from '../../components/Page';
import LineItem from '../../components/LineItem';
import { Flex, Box, Card} from 'rimble-ui';
import Text from '../../components/Text';

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
    <Box p={3}>
    <Card p={2} borderRadius={2}>
      <Flex flexDirection="column">
      <Text level={2} as={'h2'}>From</Text>
      <LineItem  value={from} />
      <Text level={2} as={'h2'}>To</Text>
      <LineItem  value={to} />
      <Text level={2} as={'h2'}>Amount</Text>
      <LineItem value={`${amount} ${asset.name}`} />
      {message && <LineItem name='Message' value={message} />}
      </Flex>
    </Card>
      <Flex mt={2}>
        <Button disabled={sending} onClick={send}>
          Send
        </Button>
      </Flex>
      </Box>
    </Page>
  );
};

export default withBurner(ConfirmPage);
