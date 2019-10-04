import React from 'react';
const classes = require('./ExchangeInput.module.css');

const InputBox = ({ value, unit, input, onChange }) => (
  <div className={classes.box}>
    {input ? (
      <input value={value} onChange={onChange} className={classes.amount} type="number" />
    ) : (
      <div className={classes.amount}>{value}</div>
    )}
    <div className={classes.unit}>{unit}</div>
  </div>
);

const ExchangeInput = ({ input, output, inputUnit, outputUnit, onChange, disabled }) => {
  return (
    <div className={classes.exchangeInput}>
      <div className={classes.col}>
        <InputBox
          value={input}
          unit={inputUnit}
          input
          onChange={e => disabled || onChange(e.target.value)}
        />
      </div>
      <div className={classes.arrowContainer}>
        <div className={classes.arrow}>></div>
      </div>
      <div className={classes.col}>
        <InputBox value={output} unit={outputUnit} />
      </div>
    </div>
  );
};

export default ExchangeInput;
