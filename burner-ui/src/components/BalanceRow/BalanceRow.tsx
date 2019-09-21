import React from 'react';
import { Flex } from 'rimble-ui';
import styled from 'styled-components';
import AccountBalance, {
  AccountBalanceData
} from '../../data-providers/AccountBalance';

import BalanceItem from '../BalanceItem';

const Row = styled.section`
  padding: 32px var(--page-margin);
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
`;

interface BalanceRowProps {
  accounts?: any;
  assets?: any;
}

const BalanceRow: React.FC<BalanceRowProps> = ({ accounts, assets }) =>
  accounts.length > 0 ? (
    <Row>
      {assets.map(asset => (
        <AccountBalance
          key={asset.id}
          asset={asset.id}
          account={accounts[0]}
          render={(err: Error, data: AccountBalanceData | null) => (
            <BalanceItem
              asset={asset}
              usdBalance={data && data.usdBalance}
              balance={data && data.displayBalance}
            />
          )}
        />
      ))}
    </Row>
  ) : (
    <div>'Loading'</div>
  );

export default BalanceRow;
