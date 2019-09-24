// @ts-ignore
import React from "react";
import styled from "styled-components";
import { Account } from "../../";
import AddressInputAccount from "../AddressInputAccount";
import { RimbleInput } from '../../components/RimbleInput';
import { SCAN_QR_DATAURI } from "../../constants";

const ADDRESS_REGEX = /^(0x)?[0-9a-f]{40}$/i;

const styles = {
  scanBtn: {
    backgroundImage: `url("${SCAN_QR_DATAURI}")`,
    width: 40,
    height: 40
  },
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
  color: #4E3FCE;
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
    <InputContainer>
      {_account ? (
        <>
          <AddressInputAccount account={_account} />
          <ButtonClear onClick={() => onChange("", null)}>
            {"\u00D7"}
          </ButtonClear>
        </>
      ) : (
        <>
          <InputField
            value={value}
            onChange={e => onChange(e.target.value, null)}
          />
          {scan && <ButtonScan onClick={scan} />}
        </>
      )}
    </InputContainer>
  );
};

export default AddressInputField;
