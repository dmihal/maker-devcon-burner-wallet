// @ts-ignore
import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { Asset } from "@burner-wallet/assets";

const ONE_ETH = 1000000000000000000;

export interface AmountInputProps {
  onChange: (val: string, isMax: boolean) => void,
  asset?: Asset | null,
  value: string,
  disabled?: boolean,
  max?: string | null,
}

const Wrapper = styled.div`
  display: flex;
  border: solid 1px #cccccc;
  border-radius: 4px;
  display: flex;
  height: 40px;
`;

const Unit = styled.div`
  background: #d2d2d2;
  display: flex;
  align-items: center;
  padding: 4px;
`;

const Input = styled.input`
  flex: 1 0;
  border: none;
  font-size: 16px;
  padding: 4px;
  background: transparent;
`;

const MaxBtn = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  background: #c07a53;
  color: white;
  cursor: pointer;
`;

const AmountInput: React.FC<AmountInputProps> = ({
  onChange,
  asset,
  value,
  disabled,
  max,
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
    <div>
      <Wrapper>
        {isUSD && <Unit>$</Unit>}
        <Input
          type="number"
          placeholder="0.00"
          onChange={e => onChange(e.target.value, false)}
          value={value}
          disabled={disabled}
          min="0"
          max={max || undefined}
        />
        {!isUSD && asset && <Unit>{asset.name}</Unit>}
        {max && (
          <MaxBtn onClick={() => onChange(max, true)}>Max</MaxBtn>
        )}
      </Wrapper>
      {usdValue && <div>${usdValue} USD</div>}
    </div>
  );
};

export default AmountInput;
