import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Card } from 'rimble-ui';
import CurrencyInput from 'react-currency-input';
import AddressInputField from '../../components/AddressInputField';
import Text from '../../components/Text';

interface CustomRequestAmountProps {
  amount: number | null;
}

const AmountWrapper = styled(Flex)`
  background: var(--modal-background);
  padding: 0 var(--page-margin);
  align-items: center;
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
    console.log(this.props);
    return (
      <>
        <AmountWrapper>
          <Text level={3} as={'h2'}>
            How much do you want to request
          </Text>
          <AmountInput
            // type='number'
            precision={2}
            pattern='\d*'
            value={this.props.amount}
            placeholder='00.00'
            thousandSeparator=''
            maxLength='7'
            onChangeEvent={e => this.props.updateValue(e.target.value)}
          />
        </AmountWrapper>
      </>
    );
  }
}

export default CustomRequestAmount;
