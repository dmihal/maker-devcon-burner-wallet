import React from 'react';
import { Asset } from '@burner-wallet/assets';
import { Card, Box, Flex } from 'rimble-ui';
import styled from 'styled-components';
import Text from '../Text';

interface BalanceItemProps {
  asset: Asset | string;
  usdBalance?: string | null;
  balance?: string | null;
}

const TokenIcon = styled.img`

`

const icoDai = require('../../static/images/IcoSvgDai.svg');
const icoXdai = require('../../static/images/IcoSvgXdai.svg');
const icoEth = require('../../static/images/IcoSvgEth.svg');


const BalanceCard = styled(Card)`
  display: flex;
  font-size: 48px;
  font-weight: 400;
  /* Use monospaced characters and leverage ch unit */
  min-width: calc(4ch + 24px);
  max-width: calc(6ch + 24px);
  &:not(:first-of-type) {
    margin-left: 12px;
  }
  & > span {
    display: block;
  }
`;

const BalanceItem: React.FC<BalanceItemProps> = ({
  asset,
  usdBalance,
  balance
}) => (
  <BalanceCard flex={1} borderRadius={'8px'} p={'8px'} pr={3}>
      <TokenIcon src={icoEth} />
        <Flex flexDirection={'column'} textAlign={'right'} flex={'1'}>
        {!(usdBalance || balance) && '-'}
        {usdBalance
          ? `$${Number(usdBalance).toFixed(2)}`
          : Number(balance).toFixed(2)}
        <Text width={'100%'} as={'span'} level={4}>
          {asset.name}
        </Text>
        </Flex>
  </BalanceCard>
);

export default BalanceItem;
