import React from 'react';
import styled from 'styled-components';
import AccountBalance, { AccountBalanceData } from '../../data-providers/AccountBalance';
import { Asset } from "@burner-wallet/assets";
import { withBurner, BurnerContext } from "../../BurnerProvider";
import BalanceItem from '../BalanceItem';

const Row = styled.section`
  padding: 32px var(--page-margin);
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
`;

const BalanceRow: React.FC<BurnerContext> = ({ defaultAccount, assets }) => (
  <Row>
    {assets.map((asset: Asset) => (
      <AccountBalance
        key={asset.id}
        asset={asset.id}
        account={defaultAccount}
        render={(data: AccountBalanceData | null) => (
          <BalanceItem
            asset={asset}
            usdBalance={data && data.usdBalance}
            balance={data && data.displayBalance}
          />
        )}
      />
    ))}
  </Row>
);

export default withBurner(BalanceRow);
