import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex } from 'rimble-ui';
import CurrencyInput from 'react-currency-input';
import { withBurner } from '../../BurnerProvider';
import Text from '../../components/Text';
import AssetSelector from '../../components/AssetSelector';

interface CustomRequestAmountProps {
  amount: number | null;
  updateValue: Function;
  assets;
}

const AmountWrapper = styled(Flex)`
  padding: var(--page-margin);
  align-items: flex-start;
  flex-direction: column;
  flex: 1;
`;

const AmountInput = styled(CurrencyInput)`
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  font-size: 80px;
  height: 80px;
  margin-top: auto;
  margin-bottom: auto;
  background-color: transparent;
  appearance: none;
`;

class CustomRequestAmount extends Component<CustomRequestAmountProps> {
  constructor(props: CustomRequestAmountProps) {
    super(props);
  }

  render() {
    const { assets } = this.props;
    console.log(this.props);
    return (
      <>
        <AmountWrapper>
          <Text level={3} as='h2' margin='0 0 16px 0'>
            Enter the amount you would like to request:
          </Text>
          <AmountInput
            // type='number'
            autofocus={false}
            precision={2}
            pattern='\d*'
            value={this.props.amount}
            placeholder='00.00'
            thousandSeparator=''
            maxLength='7'
            onChangeEvent={e => this.props.updateValue(e.target.value)}
          />
          {/* <AssetSelector
            selected={selectedAsset}
            assets={assets}
            onChange={() => this.setState({ selectedAsset: newAsset })}
            disabled={sending}
          /> */}
        </AmountWrapper>
      </>
    );
  }
}

export default withBurner(CustomRequestAmount);
