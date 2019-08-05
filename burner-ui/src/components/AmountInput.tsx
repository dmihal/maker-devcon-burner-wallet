import React, { ChangeEvent } from 'react';
import { Asset } from '@burner-wallet/assets';
const classes = require('./AmountInput.module.css');

const ONE_ETH = 1000000000000000000;

interface AmountInput {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  asset?: Asset | null,
  value: string,
  disabled: boolean,
}

const AmountInput: React.FC<AmountInput> = ({ onChange, asset, value, disabled }) => {
  let isUSD = false;
  let usdValue;
  if (!isUSD && asset) {
    try {
      isUSD = asset.getUSDValue(ONE_ETH.toString()) === '1.00';
      usdValue = asset.getUSDValue((parseInt(value) * ONE_ETH).toString());
    } catch (e) {}
  }
  return (
    <div>
      <div className={classes.inputContainer}>
        {isUSD && <div className={classes.unit}>$</div>}
        <input
          type="number"
          placeholder="0.00"
          className={classes.input}
          onChange={onChange}
          value={value}
          disabled={disabled}
          min="0"
        />
        {!isUSD && asset && <div className={classes.unit}>{asset.name}</div>}
      </div>
      {usdValue && <div>${usdValue} USD</div>}
    </div>
  );
};

export default AmountInput;