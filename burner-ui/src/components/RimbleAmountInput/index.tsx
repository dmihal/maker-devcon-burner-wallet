// @ts-ignore
import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { Asset } from "@burner-wallet/assets";
import { Input } from 'rimble-ui';

const ONE_ETH = 1000000000000000000;

export interface AmountInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  asset?: Asset | null;
  value: string;
  disabled?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  align-content: center;
`;

const Unit = styled.div`
  background: #d2d2d2;
  display: flex;
  align-items: center;
  padding: 4px;
`;

const StyledInput = styled(Input)`
  display: flex;
  align-content: center;
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;
  font-size: 80px;;
  background: none;
  box-shadow: none;
  text-align: center;
  padding: 0;

  :focus {
    box-shadow: none;
  }

  :hover {
    box-shadow: none;
  }
`

const AssetSelector = styled

const AmountInput: React.FC<AmountInputProps> = ({
  onChange,
  asset,
  value,
  disabled
}) => {
  let isUSD = false;
  let usdValue;
  if (!isUSD && asset) {
    try {
      isUSD = asset.getUSDValue(ONE_ETH.toString()) === "1.00";
      usdValue = asset.getUSDValue((parseFloat(value) * ONE_ETH).toString());
    } catch (e) {}
  }
  return (
      <Wrapper>
        {isUSD && <Unit>$</Unit>}
        <StyledInput
          type="number"
          placeholder="0"
          onChange={onChange}
          value={value}
          disabled={disabled}
          min="0"
        />
        { /* Do we need this, anymore?
        {!isUSD && asset && <Unit>{asset.name}</Unit>}
        {usdValue && <div>${usdValue} USD</div>}
        */}
      </Wrapper>
  );
};

export default AmountInput;
