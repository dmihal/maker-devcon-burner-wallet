// @ts-ignore
import React from 'react';
import styled from 'styled-components';
import { Account } from '../../';
import AddressInputAccount from '../AddressInputAccount';
import { RimbleInput } from '../../components/RimbleInput';
import { SCAN_QR_DATAURI } from '../../constants';
import { Flex, Input, Icon, Button, Box } from 'rimble-ui';

const ADDRESS_REGEX = /^(0x)?[0-9a-f]{40}$/i;

const styles = {
  scanBtn: {
    backgroundImage: `url("${SCAN_QR_DATAURI}")`,
    width: 40,
    height: 40
  }
};

const InputContainer = styled.div`
  border-radius: 8px;
  display: flex;
`;

const InputField = styled(RimbleInput)`
  order: none;
  flex: 1 0;
  font-size: 20px;
  padding: 4px;
`;
const ButtonScan = styled.button`
  background-image: url("${SCAN_QR_DATAURI}");
  width: 40px;
  height: 40px;
`;

const ButtonClear = styled.button`
  font-size: 32px;
  color: var(--color-primary);
  background: transparent;
  border: 0px;
  outline: none;
`;

const StyledWrapper = styled(Box)`
  & {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    width: 100%;
    max-width: 320px;
    position: relative;
  }
`;

const StyledInput = styled(Input)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface AddressInputFieldProps {
  value: string;
  account?: Account | null;
  onChange: (address: string, account: Account | null) => void;
  scan?: () => any;
  disabled?: boolean;
  classes: any;
}

const AddressInputField: React.FC<AddressInputFieldProps> = ({
  value,
  account,
  onChange,
  scan,
  disabled
}) => {
  let _account = account;
  if (!account && ADDRESS_REGEX.test(value)) {
    _account = { address: value };
  }
  return (
    <StyledWrapper>
      {_account ? (
        <>
          <AddressInputAccount account={_account} />
          <ButtonClear onClick={() => onChange('', null)}>
            {'\u00D7'}
          </ButtonClear>
        </>
      ) : (
        <>
          <StyledInput
            value={value}
            width={1}
            fontWeight={3}
            onChange={e => onChange(e.target.value, null)}
          />
          <Flex position={'absolute'} right={0} mr={1} bottom='8px'>
            <Button size={'small'} mx={2} p={0} onClick={scan} mainColor="var(--color-primary)">
              <Icon name='CenterFocusWeak' />
            </Button>
          </Flex>
          {scan && (
            <Flex position={'absolute'} right={0} mr={1} bottom='8px'>
              <Button size={'small'} mx={2} p={0} onClick={scan} mainColor="var(--color-primary)">
                <Icon name='CenterFocusWeak' />
              </Button>
            </Flex>
          )}
        </>
      )}
    </StyledWrapper>
  );
};

export default AddressInputField;
